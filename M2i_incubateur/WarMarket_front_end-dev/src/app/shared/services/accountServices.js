import { getToken, decodeToken } from './tokenServices';
import {ROLE_ADMIN, ROLE_SALESMAN} from '../../shared/constants/rolesConstant'
/**
 * To get all the roles of the current user
 * 
 * @return {Array} roles of the current user
 * @author Peter Mollet
 */
export function accountRoles() {
    const payload = decodeToken()
    return payload.AUTHORITIES_KEY.split(",")
}

/**
 * To get the login of the current user
 * 
 * @return {string} login of the current user
 * @author Peter Mollet
 */
export function accountLogin(){
    const payload = decodeToken()
    return payload.sub
}

export function hasRole(role) {
  
    return accountRoles().includes(role)
}


/**
 * To know if the user has the role of administrator
 * 
 * @return {boolean} true if the user is admin
 * @author Malek MOKRANI
 */
export function isAdmin()
{
    try{
        return hasRole(ROLE_ADMIN);
    }catch(e)
    {
        return false;
    }
}

/**
 * To know if the user has the role of commercial
 * 
 * @return {boolean} true if the user is commercial
 * @author Malek MOKRANI
 */
 export function isComm()
 {
     try{
         return hasRole(ROLE_SALESMAN);
     }catch(e)
     {
         return false;
     }
 }

/**
 * To check if the current user is authenticated
 * Check the token, and it's validity
 * 
 * @return {boolean} true if user is authenticated
 * @author Peter Mollet
 */
export function isAuthenticated() {
    try{
        const token = getToken()
        const payload = decodeToken()
        const roles = payload.AUTHORITIES_KEY.split(",")
        const expirationDate = payload.exp
        const login = payload.sub
        const dateNow = new Date();
        return token
            && roles.length > 0
            && login
            && expirationDate < dateNow.getTime()
    } catch {
        return false
    }
}