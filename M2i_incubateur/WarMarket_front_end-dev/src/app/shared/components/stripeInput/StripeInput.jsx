import React from "react";
import {
  usePaymentInputs,
  PaymentInputsWrapper
} from "react-payment-inputs";
import { Field, Form, Formik } from "formik";
import images from "react-payment-inputs/lib/images";
import { Debug } from "./debug";
import { gt, isEmpty, isNil, lt, length, match, split, trim } from "ramda";
import { stylish, stylish2 } from "./inputWrapperStyles";
import useWindowDimensions from "./windowDimensions";
import { accountLogin } from "../../services/accountServices";
import { URL_USER_PAY_METOD } from "../../constants/urls/urlConstants";
import { CreditCardIcon } from "@heroicons/react/solid";

const validateName = value => {
  //validate for only middle Initial
  let errorMessage;
  let singleName = value => split(" ", trim(value));
  let nameLength = value => length(value) < 2;

  if (isEmpty(value)) {
    errorMessage = "Name is required";
    // } else if (length(value) < 5) {
  } else if (lt(length(value), 5)) {
    errorMessage = "Too Short";
    // } else if (length(value) > 50) {
  } else if (gt(length(value), 50)) {
    errorMessage = "Too Long";
  } else if (isEmpty(match(/ /, trim(value)))) {
    errorMessage = "Enter Full (First and Last) Name Here";
    // } else if (!isEmpty(filter(nameLength, singleName(value)))) {
    //   errorMessage = "Too Short";
  }
  return errorMessage;
};

const ccValidator = value => {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);
};

export const StripeInput = ({ isUS, submit, tot, remember, isRemember, errorPay, cards ,disabled}) => {
  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getZIPProps,
    meta,
    wrapperProps
  } = usePaymentInputs();




  const locationMetod = () => {
    const test = window.location.pathname

    if (test === URL_USER_PAY_METOD) { return true }
    else { return false }
  }
  const email = () => accountLogin()
  const { height, width } = useWindowDimensions();

  return (
    <div className="flex justify-center  text-sm p-2 bg-white rounded-lg border shadow-md lg:p-5 " style={{ maxWidth: 800 }}>
      <div className="text-center">




        {!locationMetod() ? <div><p className="font-bold text-3xl">Tot a payer : {tot}€</p></div> : null}
        {locationMetod() ? <h1 className="font-bold text-2xl m-2">AJOUTER UN MOYEN DE PAIEMENT</h1> : null}

        <Formik
          // validationSchema={}
          enableReinitialize={true}
          initialValues={{
            cardHolder: "",
            email: email(),
            cardNumber: "",
            cvc: "",
            // zip: "",
            expiryDate: "",
            amount: ""
          }}
          onSubmit={values => submit(values)}

          render={formikProps => (
            <React.Fragment>
              <Form>
                <div className="">

                  <div className="">
                    <div className="">
                      <label className=""><h1 className="font-bold">Email</h1></label>
                      <div className="flex justify-center ">
                        <p >   <Field
                          className={
                            isNil(formikProps.errors.cardHolder)
                              ? `rounded-none rounded-b-md mb-4 shadow-inner input bg-yellow-200 lg:w-96 `
                              : `rounded-none rounded-b-md mb-4 shadow-inner input bg-yellow-200  lg:w-96`
                          }
                          name="email"
                          placeholder="email@email.com"
                          type="text"
                          disabled noError
                        /></p>
                        <span className="icon is-large is-left">
                          <i className="fas fa-user" />
                        </span>
                      </div>
                      {/*formikProps.errors.cardHolder &&
                  formikProps.touched.cardHolder ? (
                    <p className="help is-danger">
                      {formikProps.errors.cardHolder}
                    </p>
                  ) : null*/}
                    </div>
                  </div>

                  <div className="flex justify-center ">
                    <div className="">
                      <label className="label"><h1 className="font-bold">Proprietaire CB</h1></label>
                      <div className="control has-icons-left">
                        <p>  <Field

                          disabled={errorPay === 3 ? true : false}
                          validate={validateName}
                          className={
                            isNil(formikProps.errors.cardHolder)
                              ? `rounded-none rounded-b-md mb-4 shadow-inner input  lg:w-96`
                              : `rounded-none rounded-b-md mb-4 shadow-inner input  border-red-700 lg:w-96`
                          }
                          name="cardHolder"
                          placeholder="Jane Doe"
                          type="text"
                        // onChange={handleChange}
                        /></p>
                        <span className="icon is-large is-left">
                          <i className="fas fa-user" />
                        </span>
                      </div>
                      <div className="h-12">   {formikProps.errors.cardHolder &&
                        formikProps.touched.cardHolder ? (
                        <p className=" ">
                          {formikProps.errors.cardHolder}
                        </p>
                      ) : <p className=""></p>}</div>
                    </div>
                  </div>

                </div>

                <div className="h-24">
                  <div className="">
                    <div> <label className="label"><h1 className="font-bold">Credit Card Details</h1></label></div>
                    <p>  <PaymentInputsWrapper

                      {...wrapperProps}
                      styles={gt(width, 700) ? stylish2 : stylish}
                    >
                      <svg {...getCardImageProps({ images })} />
                      <Field name="cardNumber">
                        {({ field }) => (
                          <input disabled={errorPay === 3 ? true : false}
                            className=""
                            {...getCardNumberProps({
                              onChange: field.onChange,
                              onBlur: field.onBlur
                            })}
                          />
                        )}
                      </Field>
                      <Field name="expiryDate">
                        {({ field }) => (
                          <input disabled={errorPay === 3 ? true : false}

                            {...getExpiryDateProps({
                              onChange: field.onChange,
                              onBlur: field.onBlur
                            })}
                          />
                        )}
                      </Field>
                      <Field name="cvc">
                        {({ field }) => (
                          <input disabled={errorPay === 3 ? true : false}

                            {...getCVCProps({
                              onChange: field.onChange,
                              onBlur: field.onBlur
                            })}
                          />
                        )}
                      </Field>

                    </PaymentInputsWrapper></p>
                  </div>
                </div>

                {!locationMetod() ? <div class="flex mt-2 mb-2">
                  <input onClick={() => {

                    remember()

                  }} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left ml-5" type="checkbox" defaultChecked={isRemember} id="flexCheckChecked" />
                  <label htmlFor="rememberMe" className="m-0 text-gray-400 text-sm ml-5">
                    Mémorisez pour mes futurs achats
                  </label></div>


                  : null}
              <div className="h-24">  {errorPay !== 3 &&
                  formikProps.touched.cardNumber === true
                  && 
                  formikProps.touched.cardHolder === true 
                  &&
                  formikProps.touched.cvc === true 
                  &&
                  formikProps.isValid===true
                  &&
                  !meta.error

                
                  ? <div className="mb-10 ">
                    <button  type="submit"className={!disabled?'validateCart animate-wiggle':'validateCart animate-pulse'} disabled={disabled}>
                      {!locationMetod() ? <p>PAYER
                      </p> : <div className="grid grid-cols-5"><p className="text-xl col-span-4 mt-1">ENREGISTRER </p> <CreditCardIcon className="w-7 m-1"></CreditCardIcon></div>}
                    </button>
                  </div> : null} </div></Form>
              {//<Debug />

              }

            </React.Fragment>
          )}
        />      <div className="h-48 lg:h-32  mt-10 lg:w-full text-mds  ">



          {errorPay === 3 ? <><p className="text-red-500 text-sm">Vous avez atteint  la limite de cartes enregistrées,</p>
            <p className="text-red-500 text-sm"> supprimez un ancien mode de paiement pour enregistrer une nouvelle carte</p></> : null}

          {!locationMetod() ? <div><p className="text-red-500 text-sm ">  {errorPay}</p></div> : null}
        </div>

      </div>

    </div>
  );
}
export default StripeInput 
