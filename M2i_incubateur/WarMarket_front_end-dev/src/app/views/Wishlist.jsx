
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFav, selectorFav } from '../shared/redux-store/favoritesSlice';
import { useHistory } from 'react-router-dom';
import { HeartIcon, XIcon, CheckIcon, ShoppingCartIcon } from '@heroicons/react/solid';

import { removeFavorite } from '../api/backend/user'
import ButtonFavorite from '../shared/components/buttons/ButtonFavorite';
const Wishlist = (props) => {


  const dispatch = useDispatch();
  const favorites = useSelector(selectorFav);
  const history = useHistory();

  const removeFav = (id) => {
    removeFavorite(id).then((res) => {

      dispatch(fetchFav())

    })
  }


  return (<div className='p-3 text-xl text-center mt-8 w-full md:w-1/2 md:m-auto'>
    <div className='flex border-b-2 border-gray-400 pb-4'>
      <HeartIcon className='w-10 h-10 text-[#c67605]' />
      <h1 className='flex items-end font-bold text-2xl ml-4 items-center'>Favoris</h1>
    </div>
    {
      favorites.length > 0 ?
        favorites.map(elt => {
          return (
            <div key={elt.id} className="flex cartCard mt-4 p-4  w-full items-center justify-between">
              <div className="pr-5">
                <div>
                  <img className='hover:cursor-pointer'
                    src={elt.picture}
                    width="100px" onClick={() => {
                      history.push(`/produits/detail/${elt.id}`)
                    }} />
                </div>
              </div>
              <div className='flex flex-col m-1 p-1' key={elt.id}>

                <div class>{elt.label}</div>
                <div>{elt.price}&nbsp;€  &nbsp;
                  <span className='font-bold'>
                    En Stock &nbsp;{elt.stock > 0
                      ?
                      <CheckIcon className='inline ml-2 w-6 h-6 text-[#048B2A]' />
                      :
                      <XIcon className='inline  ml-2 w-6 h-6 text-[#EB0707]' />}
                  </span>
                </div>
                <div className=''>
                </div>
              </div>
              <div>
                <ButtonFavorite id={elt.id} onClick={(event) => { removeFav(elt.id) }} />
              </div>
            </div>

          )
        })
        :
        (
          <h3 className='mt-16  font-bold text-2xl '>Vous n'avez ajouté aucun produit à vos favoris</h3>
        )
    }

  </div>)
}


export default Wishlist;