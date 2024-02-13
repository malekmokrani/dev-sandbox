import * as Yup from 'yup'

export const schemaFormLogin = Yup.object().shape({
    mail: Yup.string().required("Champ requis"),
    password: Yup.string().required("Champ requis")
});


export const schemaFormProfile = Yup.object().shape({
    nom: Yup.string().required("Champ requis"),
    prenom: Yup.string().required("Champ requis"),
    anniversaire: Yup.string().required("Champ requis"),
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("Champ requis"),
    numeroA: Yup.string().required("Champ requis"),
    rue: Yup.string().required("Champ requis"),
    codepostal: Yup.string().required("Champ requis"),
    ville: Yup.string().required("Champ requis"),
    pays: Yup.string().required("Champ requis"),
    telephone: Yup.string()
        .required("Champ requis")
        .matches(/^[0-9]+$/, "Nombres uniquement")
        .min(10, "Doit contenir au moins 10 chiffres")
        .max(16, "Doit contenir moins de 16 chiffres"),
    password: Yup.string()
        .required("Le mot de passe est requis")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
        ),
    passwordTest: Yup.string()
        .oneOf([Yup.ref("password"), null], "pas de correspondance")
        .required("Champ requis"),

})

export const schemaFormRegistration = Yup.object().shape({
    lastName: Yup.string().required("Saisissez votre nom").matches("^([a-zA-Z -]|[à-úÀ-Ú])+$" , "Votre nom ne peut contenir de caratères spéciaux ou des chiffres").max(32, "Doit contenir moins de 32 caractères"),
    firstName: Yup.string().required("Saisissez votre prénom").matches("^([a-zA-Z -]|[à-úÀ-Ú])+$", "Votre prénom ne peut contenir de caratères spéciaux ou des chiffres").max(32, "Doit contenir moins de 32 caractères"),
    mail: Yup.string()
        .email("L'email n'est pas valide")
        .required("Saisissez votre adresse Email"),
    password: Yup.string()
        .required("Choisissez un mot de passe")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
        ),
    passwordTest: Yup.string()
        .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
        .required("Confirmé le mot de passe que vous avez saisie"),


})

// Used to start the password reset feature : ask the user their email address.
export const schemaFormAskNewPassword = Yup.object().shape({
    email: Yup.string().required("Adresse mail requise"),
})

// Used to create and check a new password
export const schemaFormValidateNewPassword = Yup.object().shape({
    newPassword: Yup.string().required("Champs requis").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
    ),
    verifyNewPassword: Yup.string().required("Champs requis").oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne sont pas similaires")

})



export const schemaFormProfileUpdate =  Yup.object().shape({
    firstName: Yup.string()/*.required("Required input").*/.max(50, "50 caractères Maximum").nullable(true),
    lastName: Yup.string()/*.required("Required input")*/.max(50, "50 caractères Maximum").nullable(true),
    birthdate: Yup.string(),//.required("Required input"),
   /* mail: Yup.string()
        .email("L'email n'est pas valide")
        .required("Champ requis"),*/
    number: Yup.string()/*.required("Required input")*/.max(10, "10 caractères Maximum").nullable(true),
    street: Yup.string()/*.required("Required input")*/.nullable(true),
    postalCode: Yup.string()/*.required("Required input")*/.nullable(true),
    city: Yup.string()/*.required("Required input")*/.nullable(true),
    country: Yup.string()/*.required("Required input")*/.nullable(true),
    phone: Yup.string()
       /* .required("Champ requis")*/
        .matches(/^[0-9]+$/, "Nombres uniquement")
        .min(10, "Doit contenir au moins 10 chiffres")
        .max(16, "Doit contenir moins de 16 chiffres").nullable(true),
  

})

// Used to create label by labelPannel
export const schemaFormLabel = Yup.object().shape({
    label: Yup.string().required("Label requis"),
})