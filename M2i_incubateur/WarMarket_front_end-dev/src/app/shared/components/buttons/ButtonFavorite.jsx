import React from 'react';
import {    HeartIcon, RefreshIcon } from '@heroicons/react/outline';
import {    useState } from 'react';
import {    selectIsLogged } from './../../../shared/redux-store/authenticationSlice';
import {    useSelector , useDispatch  } from 'react-redux';
import {    addFavorite , removeFavorite    } from '../../../api/backend/user'
import {    fetchFav    , selectorFav, selectorFavState } from '../../../shared/redux-store/favoritesSlice'
import {    useEffect } from 'react';

const ButtonFavorite = ({ id }) => {

    const [toggle, setToggle] = useState(null);
    const [reload, setReload] = useState(false);
    const isLogged = useSelector(selectIsLogged);
    const fav = useSelector(selectorFav);
    const favState = useSelector(selectorFavState);

    let lock = true;
    const dispatch = useDispatch();

    useEffect(() => {
        if (favState != "loading") {
            let bool = false;
            fav.map(elt => {
                if (elt.id === id) bool = true;
                return;
            });
            
          
            setToggle(bool);
        }
    });

    useEffect(()=>{
        switch (favState) {
            case "loading":
                if(!lock)setReload(true);
            break;
            default:
                lock = true;
                setReload(false);
            break;
        }
    },[favState]);

    const clickHandler = (event) => {   
        lock = false;
        setReload(true)
        if (!toggle) add();
        else rm();
    }

    const getDivStyle = () => {
        const style = " p-2 rounded-2xl m-1 p-3 hover:cursor-pointer";
      
        if (toggle) return "bg-[#ff0000] " + style;
        return "login " + style;

    }

    const add = () => {
      
        addFavorite(id).then((res) => {
            dispatch(fetchFav())
        }).catch(error => console.log(error))
    }

    const rm = () => {
        removeFavorite(id).then((res) => {
            dispatch(fetchFav())
        }).catch(error => console.log(error));
    }

    return (<div>
        {!isLogged ? (<></>) : (
            <div className={getDivStyle()}>
                <button title={toggle ? "Parmi vos produits favoris" : "Ajouter au favoris"} >
                {
                     !reload ?
                     (<HeartIcon 
                            width={32} 
                            height={32}
                            onClick={clickHandler}
                            className={toggle ? "text-white " : "text-black"} />)
                    :
                     (<RefreshIcon 
                            width={32} 
                            height={32}
                            onClick={clickHandler} 
                            className="scale-[-1] animate-spin" />)
}                </button>
            </div>)}
    </div>);
}

export default ButtonFavorite;  