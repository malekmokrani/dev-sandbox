import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { defaulValuesLogin } from './../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';
import { schemaFormLogin } from './../../shared/constants/formik-yup/yup/yupUser';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import { CustomCheckbox, CustomInput } from '../../shared/components/form-and-error-components/InputCustom';
import { URL_PASSWORD_RESET_START } from '../../shared/constants/urls/urlConstants';

/**
 * Component Form Login
 * Use Formik to create the Form
 * 
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Peter Mollet
 */
const FormLogin = ({ submit, errorLog }) => (
    <Formik initialValues={defaulValuesLogin} onSubmit={submit} validationSchema={schemaFormLogin}>
        <Form className='m-8'>
            <div>     <div className='rounded-md shadow-sm -space-y-px'>
                <p><label className="mb-2">Mail</label>
                <Field type="text" name="mail"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />
                <label className="mb-2">Mot de passe</label>
                <Field type='password' name='password'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError /></p>
            </div>

                <div className="flex flex-col justify-between">
                    <div className="flex">
                       <p> <Field name='rememberMe' component={CustomCheckbox} value={true} />
                        <label htmlFor="rememberMe" className="m-0 text-gray-400">Se souvenir de moi</label></p>
                    </div>

                    <div className="text-center mb-8 mt-4">
                        <Link to={URL_PASSWORD_RESET_START} >
                            <span className=' font-medium underline' >
                            <p>    Mot de passe oublié ?</p>
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="rounded-xl login font-bold">
                        <p>Se connecter</p>
                    </button>
                </div>
                {errorLog && <ErrorMessSmall middle message="Identifiants incorrect(s)" />}
            </div>      </Form>
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
 * @author Peter Mollet
 */
const Login = (props) => {
    return (
        <div className='mt-10 md:w-1/2 md:border-2 md:shadow-2xl'>
            <div>
                <h2 className="text-center font-bold uppercase md:mt-8">
                    Connexion
                </h2>
                {props.msg && (<div className='text-center mt-5'>
                    <p>   <span className="text-red-600 text-center">{props.msg}</span> &nbsp;
                        <span className="hover:underline  text-sm"><a href="mailto:support@warmarket.com">support@warmarket.com</a></span></p>
                </div>)}
            </div>
            <FormLogin {...props} />
        </div>
    );
};

export default Login;