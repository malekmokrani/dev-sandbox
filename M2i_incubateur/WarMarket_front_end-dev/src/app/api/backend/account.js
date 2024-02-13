
import apiBackEnd from './api.Backend';
import {
    URL_BACK_AUTHENTICATE, URL_BACK_REGISTER,
    URL_BACK_RESET_PASSWORD_START, URL_BACK_CHECK_TOKEN_VALIDITY, URL_BACK_RESET_PASSWORD_END
} from '../../shared/constants/urls/urlBackEnd';

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values)
}

export function register(values) {
    return apiBackEnd.post(URL_BACK_REGISTER, values)
}

// The user must enter their email address to start the process of resetting their password.
export function resetPasswordStart(values) {
    return apiBackEnd.post(URL_BACK_RESET_PASSWORD_START, values.email, { headers: { "Content-Type": "application/json" } })
}

// This will check the validity of the key token used to reset a user password
export function resetPasswordCheckTokenValidity(values) {
    return apiBackEnd.get(URL_BACK_CHECK_TOKEN_VALIDITY + `/${values}`)
}

// The user has entered a new password. The function will retrieve this new password and the reset token to validate the process.
export function resetPasswordEnd(values) {
    return apiBackEnd.post(URL_BACK_RESET_PASSWORD_END, values)
}