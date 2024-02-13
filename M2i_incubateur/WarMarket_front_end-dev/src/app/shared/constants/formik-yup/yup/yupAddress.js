import * as Yup from 'yup'



export const schemaFormModalAddress = Yup.object().shape({
  
    number: Yup.string().required("Required input"),
    street: Yup.string().required("Required input"),
    postalCode: Yup.string().required("Required input"),
    city: Yup.string().required("Required input"),
    country: Yup.string().required("Required input"),
    

})