import React, { useState } from 'react'
import { useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import {  getUsers, getUserAccount, changeUserRoles } from '../api/backend/user';
import Pagination from "../components/layouts/Pagination"

const AdminHomeView = () => {

    let [isOpen, modalIsOpen]       = useState(false);//Modal
    let [account, setuserAccount]   = useState({});
    const [usersData, setusers]     = useState([]);
    const [pageable, setPageable]   = useState({    current: 0,     size: 10,       nbrItems: 0,
                                                    totalPages: 0,  first: true,    last: true      });
    const sort = {
                    by:'id',        // id mail status  roles date_of_creation 
                    direction:'ASC' // ASC DESC
                };

    const loadUser = (indexPage) => {
        getUsers(indexPage, pageable.size, sort).then(res => {
           console.log( '--' , res.data.content[0].dateDDMMYYYY)
            setusers(res.data.content);
            setPageable({
                current: res.data.number,               size: res.data.size,        totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,  first: res.data.first,      last: res.data.last
            });
        }).catch(e => {
            console.log("error", e);
        })
    }

    useEffect(() => {
        loadUser(pageable.current);
    }, []);


    const upgradeUser = (userID, roleID , active) => {
        changeUserRoles({ userID: userID, rolesID: roleID, active:active }).then(res=>loadUser(pageable.current)).catch(error=>console.error(error));
    }


    const getAccount = (elt) => {
        getUserAccount(elt.id).then(res => {
            let user = {};
            Object.assign(user, res.data);
            Object.assign(user, elt);

            setuserAccount(user);
            modalIsOpen(true)

        }).catch(e => console.error(e));
    }


    const openModal  = () => modalIsOpen(true);
    const closeModal = ()=> modalIsOpen(false);



    const sortHandler = (by , direction )=>{
        sort.by = by;
        sort.direction = direction;
        loadUser(pageable.current)
    }

    return (
        <div className="flex flex-col justify-between h-full">

            {usersData != undefined && (
                <div className='w-full h-full text-center bodyTable m-2 text-sm '>
                    <div className='hidden md:grid md:grid-cols-6 headerTable p-2 '>
                      <div>
                            <button onClick={(e=>sortHandler('mail' , 'DESC'))}>
                                <span className="text-white">&uArr;</span>
                            </button>
                            UserName
                            <button onClick={(e=>sortHandler('mail' , 'ASC'))}>
                                <span className="text-white">&dArr;</span>
                            </button>    
                        </div>
                        <div>Status</div>
                        <div>roles</div>
                        <div>
                            <button onClick={(e=>sortHandler('dateOfCreation' , 'DESC'))}>
                                <span className="text-white">&uArr;</span>
                            </button>    
                            Créé le
                            <button onClick={(e=>sortHandler('dateOfCreation' , 'ASC'))}>
                                <span className="text-white">&dArr;</span>
                            </button>    
                        </div>
                        <div>Détail</div>
                    </div>
                    {usersData.map(elt => {
                        return (
                            <div key={elt.id} className="text-left flex flex-col md:grid md:grid-cols-6 m-2 border-2">
                                <div  className='pl-3 md:text-left text-center'>{elt.mail}</div>
                                <div className={elt.active ? 'text-center' : 'text-center text-red-900 bold'}>{elt.active ? "Actif" : "Désactivé"}</div>
                                <div className="text-center md:text-left">Role{elt.roles.length>1 && ('s') } : [{elt.roles}]</div>
                                <div className='text-center'>Créé le {elt.dateDDMMYYYY}</div>
                                <div className='text-center'>
                                    <button className='p-3 bg-gray-200 hover:bg-gray-400' onClick={(event => getAccount(elt))}>Détails</button>
                                </div>
                            </div>
                        )
                    })}
                </div>)}
            <Pagination pageable={pageable} callback={loadUser} />
            <ModalUser show={isOpen} closeModal={closeModal} data={account} upgradeUser={upgradeUser} />
        </div>
    );
};


import defaultAvatar from "../assets/images/default-avatar.png"
const ModalUser = (props) => {

    const [roles, setRoles] = useState(props.data.roles);
    const [active, setActive] = useState(props.data.active);

    useEffect(()=>{
        setActive(props.data.active);
        setRoles(props.data.roles);
    }, [props.data.id]);


    useEffect(()=>{
        const select = document.getElementById("roles-select");
        if(select!=undefined)  props.upgradeUser( props.data.id , parseInt(select.value) , active);
    },[active])
    
  

    const fieldSetClass = "text-gray-800 p-2 flex  items-center w-full md:w-[500px] border-b-2";
    const btnActiveClass = () => {
        const css = 'p-3 w-full ';

        if (active) return css + "bg-red-400";
        return css + 'bg-green-400';
    }

    const profileChange = (event) => props.upgradeUser( props.data.id , parseInt(event.target.value) , active);


    const popunder = {
        backgroundColor:"rgba(0,0,0,0.75)",
       // opacity: 1
       zIndex:1000
    }

    return (
        <Transition appear show={props.show} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto h-screen"
                style={popunder}
                onClose={props.closeModal}>

                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">

                        <Dialog.Overlay className="fixed inset-0" />

                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">

                        <div className="inline-block h-full p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-md mt-24 mt-0">
                            <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900 text-center">
                                <span className='md:font-normal ml-5'>ID : </span>
                                <span>{props.data.id}</span>
                                <span className='block font-normal mr-5'>Nom d'utilisateur</span>
                                <span>{props.data.mail}</span>
                                {props.data.birthdateDDMMYYYY && (<div className='text-sm'>   
                                    <span className='font-normal ml-5'>Créér le :</span>
                                    <span  className='font-normal ml-5'>{props.data.dateDDMMYYYY}</span>
                                </div>)}
                            </Dialog.Title>
                            <div className='block md:flex'>
                                <div className="mt-2 w-full m-2 p-2 flex justify-center items-center">
                                    <img src={props.data.avatar == null ? defaultAvatar : `http://localhost:8080/upload/profilePictures/${props.data.avatar} `}
                                        alt="avatar" width="200px" height="100%" />

                                </div>
                                <div className="mt-2 w-full">
                                    <div className={fieldSetClass}>
                                        <span className='italic w-1/3'>Nom :</span>
                                        <span className='w-full'>{props.data.firstName}</span>
                                    </div>
                                    <div className={fieldSetClass}>
                                        <span className='italic w-1/3'>Prénom :</span>
                                        <span className='w-full'>{props.data.lastName}</span>
                                    </div>
                                    <div className={fieldSetClass}>
                                        <span className='italic w-1/3'>date de naissance :</span>
                                        <span className='italic w-full'>{props.data.birthdateDDMMYYYY}</span>
                                    </div>
                                    <div className={fieldSetClass}>
                                        <span className='italic w-1/3'>Adresse : </span>
                                        <span className='italic w-full'>{props.data.number}&nbsp;{props.data.street}&nbsp;{props.data.postalCode}&nbsp;{props.data.city}&nbsp;{props.data.country} </span>
                                    </div>
                                    <div className={fieldSetClass}>
                                        <span className={active ? 
                                                            'font-bold text-green-900 w-full text-center' 
                                                                : 
                                                            'text-center font-bold text-red-900 w-full '}>{active ? "Compte Actif" : "Compte désactivé"}</span>
                                        <button
                                            className={btnActiveClass()}
                                            onClick={(e) => {
                                                setActive(!active);
                                                // profileChange(e);
                                            }}>{active ? "Désactiver " : "Activer"}</button>
                                    </div>
                                    <div className={fieldSetClass}>
                                        <span className='italic w-1/3'>Rôles :</span>
                                        <select name="roles" id="roles-select" className='w-full' onChange={profileChange}>
                                            <option value="1">User</option>
                                            <option value="2">Commercial</option>
                                            <option value="3">Administrateur</option>
                                        </select>
                                    </div>
                                </div>
                              
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center p-2 text-sm font-bold text-white bg-gray-500 border border-transparent 
                                        rounded-md hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
                                        absolute bottom-0 md:bottom-auto right-2/4 translate-x-2/4 md:translate-x-0 md:top-2 md:right-2"
                                    onClick={props.closeModal}>
                                        <span className='hidden md:inline'>X</span>
                                        <span className='inline md:hidden'>Fermer</span></button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>);
}


export default AdminHomeView;