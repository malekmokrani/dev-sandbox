import React from 'react'
import { ErrorMessage } from 'formik'


/**
 * Composant générique permettant de gérer facilement les Input simple (text, text-area, number) en utilisant MDB et Formik
 * 
 * @param {String} placeholder: label de l'input, qui sera affiché
 * @param {Boolean} errorRight: Permet de mettre le message d'erreur sur la droite (par défaut étant à gauche)
 * 
 * @example <Field type="email" name="email" placeholder="Email" component={ InsyInput } className='my-0'/>
 * @author Peter Mollet
 */
export const CustomInput = ({ noError, errorRight, className, type, field: {name}, field, form:{ errors, touched }, ...rest }) => {
    return (
        <div className='relative'>
            <input
                id={name}
                name={name}
                type={type}
                className={`input ${errors[name] && touched[name] && 'input-error'} ${className} `}
                {...field}
                {...rest}
            />
            {!noError && (
                <ErrorMessage
                    name={field.name}
                    className={`text-xs text-red-500 absolute bottom-0 ${errorRight ? 'right-0' : 'left-0'}`}
                />
            )}
        </div>
    )
}

/**
 * Composant générique permettant de traiter une checkbox fait pour fonctionner avec Formik
 * 
 * @param {String} label 
 * 
 * @exemple <Field name='rememberMe' label='Remember me' component={Checkbox} value={true} />
 * @author Peter Mollet 
 */
export const CustomCheckbox = ({ field: { name, value, onChange, onBlur }, form, id, label, className, ...rest }) => {
    return (
        <div className="flex items-center">
            <input
                id={name}
                name={name}
                type='checkbox'
                className={`checkbox`}
                value={value}
                checked={value}
                onChange={onChange}
                onBlur={onBlur}
                {...rest}
            />
            <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
                {label}
            </label>
        </div>
    )
}