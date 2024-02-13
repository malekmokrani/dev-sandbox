import React from "react";
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useLocation , useHistory} from "react-router-dom";
import {updatePassword, requestChangePSW, requestValidChangePSW} from '../api/backend/user'

import { useSelector } from 'react-redux';
import { selectProfileInfo } from '../shared/redux-store/userProfileSlice';
import { URL_HOME } from './../shared/constants/urls/urlConstants';

const PasswordHandling = (props)=>{

    const [initialState, setInitial] = useState(true);
    const [finalState, setFinal] = useState(false);
    const [message, setMessage] = useState(null);
   
    const location= useLocation();
    const history = useHistory();

    const [valid, setValidity] = useState(false);

    useEffect(()=>{

       const key = location.pathname.substring(12, location.pathname.length);
       if(key!=undefined){
            requestValidChangePSW(key).then(res=>{
                if(res.status==200)
                {
                    if(res.data=="OK")
                    {
                        console.log("SUCCESS");
                        setValidity(true);
                    }else{
                        const P404 = URL_HOME+'/404';
                        history.push("/P404")
                    }
                }
            })
        }
    }, [location])

    const changeRequest =()=>{

        requestChangePSW().then(response => {
            if (response.status === 200) {
                setInitial(false);
            }
        }).catch((error) => console.log(error))
       
    }


    const sendNewPassword = (values)=>{
        setMessage(null);
        updatePassword(values).then((res)=>{
            
            if(res.status==200)
            {
                if(res.data=='OK')
                {
                    setFinal(true);

                }else
                {
                    setMessage("Vous avez fait une erreur dans votre saisie");
                }
            }
            console.log(res);
        }).catch(error=>console.error(error));
    }
    

    return ( 
        finalState ? (<div className="text-center font-bold h-[300px] flex items-center justify-center text-lg">
                                Votre mot de passe à bien été modifié
                        </div>)
                    :
                    (
                !valid // no validation sended && no valid token
                    ? 
                (<InitialView clickHandle={changeRequest} state={initialState}  />) 
                    : 
                (<PswForm submitHandler={sendNewPassword} message={message}/> ))
            );

}

export default PasswordHandling;


const InitialView = (props)=>{

    const userInfo = useSelector(selectProfileInfo);
    const [message, setMessage] = useState(" Pour changer votre mots de passe nous vous envoyons un email avec un lien pour effectuer la procedure.");

    return (<div className="p-5">
                {   !props.state 
                    ?  
                    (<div className="text-center font-bold h-[300px] flex items-center justify-center text-lg">Un eMail contenant le lien pour changer votre mot de passe à été envoyé a l'address {userInfo.mail}.</div>)
                    :
                    (<div>
                        <p className="text-center font-bold h-[300px] flex flex-col items-center justify-center text-lg mt-8">
                           {message}
                            <button  onClick={(event)=>{
                                setMessage("Nous traitons votre demande ...");
                                props.clickHandle(event);
                                }}   className="mt-16 rounded login font-bold mt-4 hover:cursor-pointer p-3"  >Modifier mon mot de passe</button>
                        </p>
                    </div>)
                }

            </div>);
}

import * as Yup from 'yup'
import { useEffect } from "react";
const PswForm = (props)=>{

        const initValues  = {
            password:'',
            newPassword:'',
            newPasswordTest:''
        };

      
        const schemaPswHandle =  Yup.object().shape({
            password: Yup.string().required("Veuillez saisir votre mots de passe"),
            newPassword: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
                "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
            ),
            newPasswordTest: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "pas de correspondance")
            .required("Champ requis"),
        });

   

    return   <div className='mt-10 p-8 m-auto md:w-1/2 md:border-2 md:shadow-2xl'>
              
                <Formik
                    initialValues={initValues}
                    enableReinitialize={true}
                    onSubmit={props.submitHandler}
                     validationSchema={schemaPswHandle}>
                         {
                            (
                                {  errors, touched }
                            ) => (
                    <Form>
                     <FieldRow  error={errors['password']} name="password" label="Mot de passe" touched={touched['password']}/>
                  
                     <FieldRow  error={errors['newPassword']} name="newPassword" label="Nouveau mot de passe" touched={touched['newPassword']}/>
                     <FieldRow  error={errors['newPasswordTest']} name="newPasswordTest" label="Confirmer le mot de passe" touched={touched['newPasswordTest']}/>
                   
                        <button className="rounded login font-bold mt-8 hover:cursor-pointer  p-3 w-[200px] block m-auto" type="submit"> Réinitialiser </button>
                        {props.message && (<span className="text-center text-red-900 text-lg">{props.message}</span>)}
                    </Form>)}
                </Formik>

            </div>
}


const FieldRow = (props)=>{


    return (
        <div> 
            <div className='rounded-md shadow-sm'>
                <span className="mb-2 w-full">{props.label}</span>
                { 
                    props.error && props.touched ? 
                        (<div className="text-red-900">{props.error}</div>) : 
                        ( null )
                }
                <Field
                    type="password"
                    name={props.name}
                    className="w-full rounded-none rounded-t-md mb-4 shadow-inner" />
                   
            </div>
            
            
        </div>
        )
}