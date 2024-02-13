import React from 'react';
import { Formik, Form, Field } from 'formik';
import { defaulValuesRegistration } from '../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';
import { schemaFormRegistration } from '../../shared/constants/formik-yup/yup/yupUser';
import ErrorMessSmall from '../../shared/components/form-and-error-components/ErrorMessSmall';
import {  CustomInput } from '../../shared/components/form-and-error-components/InputCustom';




/**
 * Registration form
 * 
 * 
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Peter Mollet / Luca Toscana / Malek Mokrani
 */

const RegistrationFrom = ({ submit, errorMsg  }) => (


    <Formik enableReinitialize={true}
    initialValues={defaulValuesRegistration} 
    onSubmit={submit} 
    validationSchema={schemaFormRegistration}
    >
        <Form className='m-8'>
            <div className='rounded-md shadow-sm -space-y-px'>
           <div>  <p>   <label className="mb-2">Votre nom</label>
                <Field type="text" name="lastName"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner'  />


                <label className="mb-2">Votre prénom</label>
                <Field type='text' name='firstName'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner'  />
             
                <label className="mb-2">Email</label>
                {errorMsg && <ErrorMessSmall middle message={errorMsg} />}
                <Field type="text" name="mail"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' />
                <label className="mb-2">Mot de passe</label>
                <Field type='password' name='password'
                        component={CustomInput} 
                        placeholder="8 charactères minimum"
                        className='rounded-none rounded-b-md mb-4 shadow-inner'  />


                <label className="mb-2">Entrez le mot de passe à nouveau</label>
                <Field type='password' name='passwordTest'
                        component={CustomInput} 
                        className='rounded-none rounded-b-md mb-4 shadow-inner'  />
                        
                        
                        </p></div>
            </div>






            <div className="flex justify-center">
                <button type="submit" className="rounded-xl login font-bold">
                 <div> <p>S'inscrire</p></div>  
                </button>
            </div>
         
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
 * @author Luca Toscana
 */
const Register = (props) => {



    return (
        <div className='mt-10 md:w-1/2 md:border-2 md:shadow-2xl'>
           
                <h2 className="text-center font-bold uppercase md:mt-8">
                    Créer un compte
                </h2>
            

            {<RegistrationFrom  {...props} /> }
        </div>
    );
};

export default Register;