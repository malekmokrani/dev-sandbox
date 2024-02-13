import React from 'react';
import { Formik, Form, Field } from 'formik';

import ErrorMessSmall from '../../../../../shared/components/form-and-error-components/ErrorMessSmall';
import { CustomCheckbox, CustomInput } from '../../../../../shared/components/form-and-error-components/InputCustom';
import AddressInput from '../../../form-and-error-components/AddressInput';
import { defaulValuesAdress } from '../../../../constants/formik-yup/default-values-form/idefaultValuesAddress'
import { schemaFormModalAddress } from '../../../../constants/formik-yup/yup/yupAddress';
import { useSelector } from "react-redux";




/**
 * Component Form Login
 * Use Formik to create the Form
 * 
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Luca Toscana 
 */

const FormModalAddress = ({ submit, errorLog }) => (


    <Formik enableReinitialize={true}

    
    
    initialValues={(localStorage.getItem('myAddress')===null)?defaulValuesAdress: JSON.parse(localStorage.getItem('myAddress'))}
        
        
        
        onSubmit={submit} validationSchema={schemaFormModalAddress}>
        <Form className='m-2'>
            <div className='rounded-md shadow-sm -space-y-px'>



                <label className="mb-2">
                    <div className='flex '>
                        <div className='p-1'>

                            <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                        </div><div> <label className="mb-2 text-xs">  Adresse</label></div> </div> </label>

                <div className='grid grid-cols-1 justify-items-center	'>

                    <AddressInput></AddressInput>

                </div>

                <div className='grid grid-cols-3  gap-2	text-xs'>


                    <div className='grid grid-cols-1 justify-items-center	'>
                        <p>
                            <label className="mb-2 text-xs">Numero</label>
                            <Field type="text" name="number"
                                component={CustomInput} className='text-xs rounded-none rounded-t-md mb-4 shadow-inner' noError /></p>
                    </div>
                    <div className='grid grid-cols-1 justify-items-stretch col-span-2 w-full	'>
                        <p><label className="mb-2 text-xs">Rue</label>
                            <Field type='text' name='street'
                                component={CustomInput} className='text-xs rounded-none rounded-b-md mb-4 shadow-inner' noError />
                        </p>     </div>

                    <div className='grid grid-cols-1 justify-items-center	'>
                        <p>
                            <label className="mb-2 text-xs">Code Postal</label>
                            <Field type='text' name='postalCode'
                                component={CustomInput} className='text-xs rounded-none rounded-b-md mb-4 shadow-inner' noError />
                        </p>
                    </div>
                    <div className='grid grid-cols-1 justify-items-center	'>
                        <p>
                            <label className="mb-2 text-xs">Ville</label>
                            <Field type="text" name="city"
                                component={CustomInput} className='text-xs rounded-none rounded-t-md mb-4 shadow-inner' noError />
                        </p>
                    </div>

                    <div className='grid grid-cols-1 justify-items-center	'>
                        <p> <label className="mb-2 text-xs">Pays</label>
                            <Field type='text' name='country'
                                component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner text-xs' noError />
                        </p>
                    </div>

                </div>
                <div className='grid grid-cols-1 justify-items-center	justify-items-stretch '>

                    <p> <label className="mb-2 text-xs">Complement Address</label>
                        <Field type='text' name='additionalAddress'
                            component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner text-xs' noError /></p>
                </div>


            </div>


            <div className="flex mt-2 mb-2">
                <p>     <Field name='isMain' component={CustomCheckbox} />
                    <label htmlFor="rememberMe" className="m-0 text-gray-400 text-sm">Mémorisez pour mes futurs achats</label>
                </p>         </div>



            <div className="flex justify-center">
                <button type="submit" className="rounded-xl login font-bold">
                    Suivant
                </button>
            </div>
            {/*????????email*/errorLog && <ErrorMessSmall middle message="Identifiants incorrect(s)" />}
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
const ModalAddressForm = (props) => {

  

    return (
        <div className='mt-10 w-full md:border-2 md:shadow-2xl'>

            {<FormModalAddress {...props} />
            }
        </div>
    );
};

export default ModalAddressForm;