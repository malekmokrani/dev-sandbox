
import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { contactUs } from '../api/backend/user';
import ReCAPTCHA from 'react-google-recaptcha';


const ContactView = ()=>
{
    const initObj = {email:'', message:''};
    const validator = Yup.object().shape({
                                            email   :   Yup.string().email("L'email n'est pas valide"),
                                            message :   Yup.string()
                                                            .required("Veuillez saisir votre message")
                                                            .min(5, "Doit contenir au moins 5 caractères")
                                                            .max(1024, "Doit contenir maximum de 1024 charactères")
                                        });

    const [msgLen , setMgsLen] = useState(0);
    const [status , setStatus] = useState(false);// initial false /  sended true
    const [feedback , setFeedback] = useState("");

    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA

    const submitHandler = async (values)=>
    {
         await recaptchaRef.current.executeAsync().then(token=>{
            values.captchaToken = token;
            setStatus(true);
            setFeedback("Envoi de votre message");
            contactUs(values).then(res=>setFeedback("Merci pour vote message, nous vous reponderons très prochainement."));
         });
    }

   

    return (<div className='bg-white  pb-8'>

            <ReCAPTCHA
                sitekey={recaptcha}
                ref={recaptchaRef}
                size="invisible"  />

                <h2 className='text-center mt-5 p-5'>Nous contacter</h2>
                {status ? (<h2 className="text-center">{feedback}</h2>) : ( 
                <Formik
                    initialValues={initObj}
                    validationSchema= {validator}
                    onSubmit={submitHandler}>
                          {({ values, handleSubmit ,  handleChange, errors }) => (
                        <form className='md:w-1/2 m-8 flex flex-col p-10 bg-white  items-center md:border-2 md:shadow-2xl m-auto' > 
                          
                                
                          
                                <div className='w-full mt-5'>
                               <label className='italic'> <p>Votre message</p></label>
                                {errors.message!=undefined &&
                                    <div className="text-red-900">
                                            {errors.message}
                                    </div>
                                    }
                            </div>
                          <textarea   value={values.message} 
                                            name="message" 
                                            placeholder="Saisir ici votre message.." 
                                            className='h-[200px] mt-1 rounded w-full' 
                                            onChange={e=>{
                                                    handleChange(e);
                                                    setMgsLen(e.currentTarget.value.length);
                                                }
                                            }></textarea>
                                {msgLen>5 && (<span className='text-sm text-gray-600 text-center'>{msgLen}  / 1024<br/>caractères maximum</span>)}
                                  <div className='w-full'>
                              <p>  <label className='italic'>Votre Adress Email</label>
                                        <input type="email" name="email" placeholder='Votre Email' className='w-full' required   onChange={e=>{
                                                    handleChange(e)}}
                                                    onKeyDown={(event)=>{
                                                        if (event.key =="Enter"){
                                                            event.preventDefault();
                                                            submitHandler(values)}
                                                    }} /></p>
                                        {errors.email!=undefined &&
                                    <div className="text-red-900 w-full">
                                          <p>  {errors.email}</p>
                                    </div>
                                    }
                                 </div>  
                                <div className='w-full flex justify-end'>
                           <p>     <input  type="button" 
                                        onClick={handleSubmit} 
                                        value="Envoyer"  
                                        className="rounded-xl login font-bold mt-5 hover:cursor-pointer"  /></p>
                                </div>
                        </form>
                          )}
                </Formik>)}
            </div>)

}



export default ContactView;