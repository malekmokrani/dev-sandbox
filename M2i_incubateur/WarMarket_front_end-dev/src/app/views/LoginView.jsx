import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from '../shared/redux-store/authenticationSlice';
import { authenticate } from './../api/backend/account';
import { URL_HOME, URL_PAIEMENT } from './../shared/constants/urls/urlConstants';
import { isAuthenticated } from './../shared/services/accountServices';
import Login from './../components/account/Login';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Peter Mollet
 */
const LoginView = ({ history }) => {

    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA
    const [errorLog, setErrorLog] = useState(false)

    const [message, setMessage] = useState(null);
    const dispatch = useDispatch()



    const handleLogin = async (values) => {
        setMessage(null);
        if (localStorage.getItem('notification') === null) {
            const notification = [];
            localStorage.setItem('notification', JSON.stringify(notification))
        }
        recaptchaRef.current.executeAsync().then(token => {
            authenticate(values).then(res => {

                if (res.status === 200 && res.data.token) {
                    dispatch(signIn(res.data.token))


                    if (isAuthenticated) {

                        if (localStorage.getItem("testLoginPanier") !== null) {
                            history.push(URL_PAIEMENT)
                            localStorage.removeItem("testLoginPanier");
                              window.location.reload()

                        }
                        else {
                            

                            history.push(URL_HOME)
                               window.location.reload()

                        }

                    }
                } else {
                  

                    if (res.data.errorMessage) {
                        setErrorLog(false);
                        setMessage(res.data.errorMessage)
                    }

                }
            }).catch((error) => {
                setErrorLog(true);
                // debugger
            })
        }).catch( (error)=> setErrorLog(true)).finally(()=>   recaptchaRef.current.reset())
    }


    return (
        <div className=''>
            <div className="pb-10 md:flex md:justify-center">
                <ReCAPTCHA
                    sitekey={recaptcha}
                    ref={recaptchaRef}
                    size="invisible" />
                <Login
                    submit={handleLogin}
                    errorLog={errorLog}
                    msg={message} />
            </div>
        </div>

    );
};

export default LoginView