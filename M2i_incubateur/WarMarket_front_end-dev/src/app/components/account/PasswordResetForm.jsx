import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { defaultValuesValidateNewPassword } from './../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';
import { schemaFormValidateNewPassword } from './../../shared/constants/formik-yup/yup/yupUser';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import { CustomInput } from '../../shared/components/form-and-error-components/InputCustom';
import { URL_LOGIN } from '../../shared/constants/urls/urlConstants';

/**
 * Component form for validating the new password of the user
 * 
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of email not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Cecile
 */
const FormPasswordAskNew = ({ submit, errorLog }) => (
    <Formik initialValues={defaultValuesValidateNewPassword} onSubmit={submit} validationSchema={schemaFormValidateNewPassword}>
        <Form className='m-8'>
            <div className='rounded-md shadow-sm -space-y-px'>
                <label className="mb-2">Veuillez entrer votre nouveau mot de passe</label>
                <Field type="password" name="newPassword"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />
            </div>

            <div className='rounded-md shadow-sm -space-y-px'>
                <label className="mb-2">Entrez à nouveau le mot de passe</label>
                <Field type="password" name="verifyNewPassword"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />
            </div>

            <div className="flex justify-center mt-8">
                <button type="submit" className="rounded-xl login font-bold">
                    Créer le nouveau mot de passe
                </button>
            </div>

            <div className="text-center mb-8 mt-4">
                <Link to={URL_LOGIN} >
                    <span className=' font-medium underline' >
                        Retour
                    </span>
                </Link>
            </div>

            {errorLog && <ErrorMessSmall middle message="Les mots de passe ne correspondent pas." />}
        </Form>
    </Formik>
)

/**
 * Component Login
 * 
 * will need in props:
 *  - Submit Function
 *  - errorLog boolean
 *  - validationSchema
 * 
 * See above for information
 * 
 * @author Cecile
 */
const PasswordForgottenForm = (props) => {
    return (
        <div className='mt-10 md:w-1/2 md:border-2 md:shadow-2xl'>
            <div>
                <h2 className="text-center font-bold uppercase md:mt-8">
                    Réinitialisation du mot de passe
                </h2>
                <div className="text-center md:m-8">
                    Veuillez remplir les champs suivants pour réinitialiser votre mot de passe.
                </div>
            </div>
            <FormPasswordAskNew {...props} />
        </div>
    );
};

export default PasswordForgottenForm;