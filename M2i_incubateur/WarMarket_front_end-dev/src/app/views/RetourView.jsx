
import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { contactUs } from '../api/backend/user';
import ReCAPTCHA from 'react-google-recaptcha';
import { useHistory, useParams } from 'react-router-dom';
import OrderDetailsTable from '../components/account/Order/OrderDetailsTable';
import { accountLogin } from '../shared/services/accountServices';
import war from '../assets/images/war1.png'

const RetourView = (props) => {
        const history = useHistory()
        const account = accountLogin()
        const id = props.location.state.orderId
        const date = props.location.state.date
        const productsOrder = props.location.state.productsOrder
        const total = props.location.state.total
        const statusOrder = props.location.state.status
        const address = props.location.state.address
        const subTotal = props.location.state.subTotal
        const initObj = { message: '' };
        const validator = Yup.object().shape({
                message: Yup.string()
                        .required("Veuillez saisir votre message")
                        .min(5, "Doit contenir au moins 5 caractères")
                        .max(1024, "Doit contenir maximum de 1024 charactères")
        });

        const [msgLen, setMgsLen] = useState(0);
        const [status, setStatus] = useState(false);// initial false /  sended true
        const [feedback, setFeedback] = useState("");

        const recaptchaRef = useRef(null)
        const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA

        const pushToOrder = () => setTimeout(function () { history.push(`/order/detail/${id}`) }, 6000);

        const submitHandler = async (values) => {



                await recaptchaRef.current.executeAsync().then(token => {
                        values.captchaToken = token;
                        values.email = "lucatscn@gmail.com"
                        //account
                        values.message = "Order :" + id + "  /  Date order :" + date + "  /  message: " + values.message

                        setStatus(true);
                        setFeedback("Envoi de votre message");
                        
                        contactUs(values).then(res => {

                                if (res.status === 200) {
                                        setTimeout(function () {     setFeedback("Merci pour votre message, nous vous reponderons très prochainement.") }, 2000);
                                    
                                        pushToOrder()
                                }
                        }

                        );
                });
        }



        return (<div   className="fullscreen  pb-10 " style={{
                backgroundImage: `url(${war})`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                backgroundSize: 'cover',
        }}>
                <ReCAPTCHA
                        sitekey={recaptcha}
                        ref={recaptchaRef}
                        size="invisible" />

                <h2 className='font-bold text-center mt-5 p-1 text-white text-3xl'>Voulez-vous faire un retour or  annuler une commande?   Contactez-nous!</h2>
                <h2 className='font-bold text-center text-white text-1xl mb-3'> warhammer.market@gmail.com</h2>

                {status ? (<div className="fullscreen "><p  className="text-center text-white text-3xl	font-bold   mb-10">{feedback+""}</p></div>) : (
                      
                      
                      
                      <Formik
                                initialValues={initObj}
                                validationSchema={validator}
                                onSubmit={submitHandler}>
                                {({ values, handleSubmit, handleChange, errors }) => (
                                        <form className='md:m-auto md:w-1/2 m-8 flex flex-col p-10 bg-white  items-center md:border-2 md:shadow-2xl item-center' >



                                                <div className='w-full mt-5'>

                                                        <label className='italic'>ORDER: {props.location.state.orderId} /  {props.location.state.date}</label>


                                                        <div className='mt-5 mb-8'>
                                                                <OrderDetailsTable productsOrder={productsOrder} total={total} status={statusOrder} address={address} subTotal={subTotal} />
                                                        </div>
                                                </div>
                                                <textarea value={values.message}
                                                        name="message"
                                                        placeholder="Saisir ici votre message.."
                                                        className='h-[200px] mt-1 rounded w-full'
                                                        onChange={e => {
                                                                handleChange(e);
                                                                setMgsLen(e.currentTarget.value.length);
                                                        }
                                                        }></textarea>
                                                <span className='text-sm text-gray-600 text-center'>{msgLen}  / 1024<br />caractères maximum</span>
                                                {errors.message != undefined ?
                                                        <div className="text-red-900">
                                                                {errors.message}
                                                        </div>
                                                        : <div className="h-6">
                                                        </div>}
                                                <div className='w-full flex justify-end'>
                                                        <input type="button"
                                                                onClick={handleSubmit}
                                                                value="Envoyer"
                                                                className="rounded-xl login font-bold mt-5 hover:cursor-pointer" />
                                                </div>
                                                <h1 className='font-bold text-1xl'> Retours</h1>
                                                <p className='text-center mt-5 p-5'>
                                                        Si pour une raison quelconque vous n'êtes pas satisfait de votre commande, vous pouvez nous la retourner et être remboursé, ou l'échanger contre autre chose. Pas de complications ni de chicaneries. Nous demandons juste que le produit soit dans son emballage d'origine, qu'il existe encore dans la gamme actuelle et qu'il soit accompagné d'une preuve d'achat, et nous vous aiderons volontiers.

                                                </p>
                                                <h1 className='font-bold text-1xl'> Annuler une commande</h1>
                                                <p className='text-center mt-5 p-5'>


                                                        Si votre commande n'a pas encore été expédiée, veuillez nous contacter au plus vite, et nous tenterons de l'annuler. Si nous sommes en mesure d'annuler votre commande, nous procéderons à un remboursement intégral dans les 3 jours ouvrés après réception de votre message.


                                                </p>
                                                <p className='text-center mt-5 p-5'>



                                                        Si votre commande a déjà été expédiée, nous vous fournirons une adresse de retour, et votre remboursement sera organisé dans un délai de 3 jours ouvrés après que nous ayons reçu votre commande en état d'être revendue.

                                                </p>


                                        </form>
                                )}
                        </Formik>)}
        </div>)

}



export default RetourView;