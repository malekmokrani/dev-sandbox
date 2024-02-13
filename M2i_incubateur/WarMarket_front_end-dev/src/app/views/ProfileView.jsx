import React, { useEffect, useState }   from 'react';
import { useHistory }                   from "react-router-dom";
import { getProfile, updateProfile }    from "../api/backend/user";
import {uploadPicture , removePicture}  from '../api/backend/user';



import { useSelector, useDispatch } from 'react-redux';
import { selectProfileInfo, getuserPicture, setProfileInfo, fetchProfile } from '../shared/redux-store/userProfileSlice';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { schemaFormProfileUpdate } from '../shared/constants/formik-yup/yup/yupUser';
import { PlusCircleIcon, PencilIcon, UserIcon, CheckCircleIcon, RefreshIcon, XCircleIcon } from '@heroicons/react/solid'
import { CustomInput } from '../shared/components/form-and-error-components/InputCustom';
import DatePickerField from '../shared/components/form-and-error-components/DatePickerField'
import "../assets/styles/datepickerprofile.css"


const ProfileView = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectProfileInfo);

    useEffect(()=>{
        dispatch(fetchProfile());
    },[]);
   
    const submitHandler = (values)=>{
      
        // debugger
       
        updateProfile(values).then(res=>{
                    getProfile().then(res => {
                        dispatch(setProfileInfo(res.data));  
                    });
                
        }).catch(e=>{
            console.error("error edite profile", e)
        });
    }


    return (
        <div className=''>
            
            <h1 className="font-semibold text-center text-2xl flex justify-center items-center mb-5">
                <UserIcon className="h-6 w-6 inline mr-3" />
                <span>Données du compte</span>
            </h1>
            <div className='flex justify-center flex-col md:flex-row'>
                <Formik
                    initialValues={userInfo}
                    enableReinitialize={true}
                    onSubmit={submitHandler}
                    validationSchema={schemaFormProfileUpdate}>

                    {({ handleSubmit , setFieldValue, errors }) => (

                        <Form className='w-full md:w-3/4 lg:w-1/2'>

                            <fieldset className=''>

                                <FormRow    label="Nom&nbsp;:&nbsp;"
                                            formName="lastName"
                                            value={userInfo.first}
                                            onSubmit={handleSubmit}
                                            setFieldValue={setFieldValue}
                                            error={errors['lastName']}/>

                                <FormRow label="Prénom&nbsp;:&nbsp;"
                                            formName="firstName"
                                            value={userInfo.lastName}
                                            onSubmit={handleSubmit}
                                            setFieldValue={setFieldValue}
                                            error={errors['firstName']}/>

                                <FormRow label="Tél&nbsp;:&nbsp;"
                                        formName="phone"
                                        value={userInfo.phone}
                                        onSubmit={handleSubmit}
                                        setFieldValue={setFieldValue}
                                        error={errors['phone']}/>

                                <FromRowDate
                                        label="Date de naissance&nbsp;:&nbsp;"
                                        name="birthdate"
                                        value={userInfo.birthdate}
                                        setFieldValue={setFieldValue}
                                        onSubmit={handleSubmit}
                                        error={errors['birthdate']}/>

                                <FormRow
                                        label="N°&nbsp;:&nbsp;"
                                        formName="number"
                                        value={userInfo.number}
                                        onSubmit={handleSubmit}
                                        error={errors['number']}
                                        setFieldValue={setFieldValue}/>

                                <FormRow
                                        label="Rue°&nbsp;:&nbsp;"
                                        formName="street"
                                        value={userInfo.street}
                                        onSubmit={handleSubmit}
                                        error={errors['street']}
                                        setFieldValue={setFieldValue}/>

                                <FormRow label="Ville&nbsp;:&nbsp;"
                                        formName="city"
                                        value={userInfo.city}
                                        error={errors['city']}
                                        onSubmit={handleSubmit}
                                        setFieldValue={setFieldValue}/>


                                <FormRow label="Code postal&nbsp;:&nbsp;"
                                        formName="postalCode"
                                        value={userInfo.postalCode}
                                        onSubmit={handleSubmit}
                                        error={errors['postalCode']}
                                        setFieldValue={setFieldValue}/>

                                <FormRow label="Pays&nbsp;:&nbsp;"
                                        formName="country"
                                        value={userInfo.country}
                                        onSubmit={handleSubmit}
                                        error={errors['country']}
                                        setFieldValue={setFieldValue}/>
                    
                            </fieldset>

                        </Form>
                    )}
                </Formik>
                <PictureForm />
            </div>
        </div>
    )
        
}




const FormRow = (props) => {


    const inputDisable = 'text-right  w-full bg-transparent border-0';
    const inputEnable = 'text-right  w-full bg-white  border-1';


    const [isEnable, setEnabled] = useState(false);
    const [inputField, setInputField] = useState(undefined);


    const styleShowBtn = ' mt-2';
    const styleHideBtn = ' hidden';

    const userInfo = useSelector(selectProfileInfo);
   


    useEffect(() => {
        if (isEnable && inputField != undefined) {
            inputField.focus();
        }
    }, [isEnable])


    const cancelHandler = (event)=>{

        props.setFieldValue(props.formName , userInfo[props.formName]);
        toggle(event.currentTarget)

    }

    const toggle = (target) => {


        if (inputField == undefined) setInputField(target.parentNode.parentNode.childNodes[1].firstChild);// input Field
        setEnabled(!isEnable);

    }



    const keyHandler = (event) => {
        if (event.key == "Escape" || event.key == "Enter") {
            toggle(inputField.parentNode.parentNode.childNodes[2].firstChild);// retargeting

            if (event.key == "Escape") {
                props.setFieldValue(props.formName, props.value);
            } else {  //Enter
                props.onSubmit();
            }
        }
    }


    return (<div className="m-2 p-2 flex justify-between items-center border-b-2">






        <label className="md:w-1/4 w-1/2 text-right " >{props.label}  </label>

        <Field
            type="text"
            disabled={!isEnable}
            name={props.formName}
            onKeyDown={keyHandler}
            component={CustomInput}
            className={isEnable ? inputEnable : inputDisable}
        />


        <div>


            <button
                onClick={(event) => toggle(event.currentTarget)}
                type='button'
                className={!isEnable ? styleShowBtn : styleHideBtn}  >
                <PencilIcon className="h-6 w-6" />
            </button>

            <button type='button'
                className={props.error != undefined ? styleShowBtn : styleHideBtn} >
                <RefreshIcon className="h-6 w-6" onClick={cancelHandler} />
            </button>

            <button type='button'
                onClick={(event) => {
                    toggle(event.currentTarget);
                    props.onSubmit();
                }}
                className={isEnable && props.error == undefined  ? styleShowBtn : styleHideBtn}  >
                <CheckCircleIcon className="h-6 w-6" />
            </button>

            <button type='button'
                onClick={cancelHandler}
                className={isEnable ? styleShowBtn : styleHideBtn}  >

                <XCircleIcon className="h-6 w-6" />
            </button>



        </div>

    </div>
    );
}


const FromRowDate = (props) => {

    const styleShowBtn = 'ml-2  ';
    const styleHideBtn = 'ml-2 hidden';
    // !!!  import "../assets/styles/datepickerprofile.css"  style overrided
    const styleOpen = 'text-right bg-white w-3/4 md:w-min';
    const styleClose = 'text-right flex-none w-1/2 border-0 bg-transparent border-0';

    const [isOpen, setIsOpen] = useState(false);


    const userInfo = useSelector(selectProfileInfo);
   

    const onFocusChange = (event) => {
        setIsOpen(true);
    }


    const blurHandler = (event) => {
        setIsOpen(false);
    }


    const resetState = (parent) => {
        console.log("reset state " , props.formName , userInfo[props.formName]);
        props.setFieldValue(props.formName , userInfo[props.formName]);
        setIsOpen(false);
    }


    const openDatePicker = (event) => {
        event.currentTarget.parentNode.parentNode.childNodes[1].firstChild.firstChild.focus();
    }

    return (
        <div className="m-2 p-2 flex justify-between items-center border-b-2">
            <label className="md:w-1/4 w-1/2 text-left md:text-right flex-none" >{props.label}  </label>
            <DatePickerField
                defaultValue={props.value}
                name={props.name}
                className={isOpen ? styleOpen : styleClose}

                onFocus={onFocusChange}
                onBlur={blurHandler}
                onClickOutside={blurHandler} />

            <div className="btn-form flex-none">

                <button
                    onClick={(event) => openDatePicker(event)}
                    type='button'
                    className={isOpen ? styleHideBtn : styleShowBtn} >
                    <PencilIcon className="h-6 w-6" />
                </button>

                <button type='button'
                    onClick={(event) => {
                        // resetState(event);
                        // debugger
                        props.onSubmit();
                        setIsOpen(false);
                    }}
                    className={isOpen ? styleShowBtn : styleHideBtn}  >
                    <CheckCircleIcon className="h-6 w-6" />
                </button>

                <button type='button' onClick={resetState} className={isOpen ? styleShowBtn : styleHideBtn}  >
                    <XCircleIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}


import addImg from '../assets/images/icones/add-image.svg';

const PictureForm = (props)=>
{

    const userInfo = useSelector(selectProfileInfo);
    const dispatch = useDispatch();

  
    const fileSelector=(event)=>{
        const uploadField = event.currentTarget.parentNode.querySelector('#uploadField');

        uploadField.addEventListener('change' , (event)=>{
            // debugger
            const file =  event.currentTarget.files[0];
            if(file!=undefined)
            {
                const formData = new FormData();
                    formData.append("image", file);
                   uploadHandler(formData);
            }
        });
        uploadField.click();

    }


    const uploadHandler = (formData)=>{
    
        uploadPicture(formData).then((res)=>{
           
            getProfile().then(res => {
                dispatch(setProfileInfo(res.data));
            });
        });
    }
 
   const clickHandler = (event)=>{
        // debugger
        const uploadField = event.currentTarget.parentNode.querySelector('#uploadField')
        uploadField.value = '';// !important reset the input 
        removePicture().then((res)=>{
            
        console.log(uploadField);
        getProfile().then(res => {
            dispatch(setProfileInfo(res.data));
        });
    });

   }

 
    return (<div className='ml-20 flex flex-col justify-center items-center p-3'>
                 
                    <button
                        type="submit" 
                        onClick={fileSelector}
                        className='border-2 border-black rounded-full w-15 h-15 p-2  bg-white translate-y-2/3 translate-x-full ' >
                            <img src={addImg} 
                            width="30px" 
                            height="30px" />
                    </button>
                    <div className='border-2 border-black rounded-full overflow-hidden'>
                         <img    src={getuserPicture(userInfo.avatar)} 
                              
                              className="h-80 w-80 rounded-full object-contain" />
                    </div>
                    <div>
                        <input  type="file" 
                                name="image" 
                                accept="image/png, image/gif, image/jpeg" 
                                className='hidden' 
                                id="uploadField"/>
                        
                    </div>
                          <button onClick={clickHandler} className={userInfo.avatar==null ? 'hidden' : ''}>remove</button>       
            </div>);

}


export default ProfileView;


