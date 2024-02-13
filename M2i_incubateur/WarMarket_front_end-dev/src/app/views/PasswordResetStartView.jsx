import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPasswordStart } from '../api/backend/account';
import PasswordForgottenForm from '../components/account/PasswordForgottenForm';
import { URL_HOME} from '../shared/constants/urls/urlConstants';
/**
 * Forgotten password page view : start the password recovering feature
 * 
 * @param {object} history 
 * @author Cecile
 */
const PasswordResetStartView = ({ history }) => {

    const [errorLog, setErrorLog] = useState(false);
    const [reqSend , setreqSend] = useState(false);

    const handleAskEmailAddress = (values) => {
    
        resetPasswordStart(values).then(response => {
            if (response.status === 200) {
                setreqSend(true);
            }
        }).catch(() => setErrorLog(true))
    }

    return (
        
        reqSend==false ? 
        <div className=''>
            <div className="md:flex md:justify-center">
                <PasswordForgottenForm submit={handleAskEmailAddress} errorLog={errorLog} />
            </div>
        </div>
            :
        <div className='font-bold uppercase m-20'>
       
               <h3 className='text-center'>Un email vous a été envoyé à l'adresse indiquée.</h3>
          
        </div>
    );
};

export default PasswordResetStartView