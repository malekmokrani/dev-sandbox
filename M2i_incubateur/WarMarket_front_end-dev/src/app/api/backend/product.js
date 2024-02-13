import apiBackEnd from "./api.BackendWithToken"
import apiBackEndNoToken from "./api.Backend"

import {URL_BACK_PRODUCT_DETAIL,URL_BACK_PRODUCT_DETAIL_RELATED,
     URL_BACK_PRODUCTS, URL_BACK_TOTAL_PRODUCTS, URL_BACK_GET_NUMBER_OF_PRODUCTS_BY_FIELD, 
     URL_BACK_PRODUCTS_SEARCH_CRITERIA} from "../../shared/constants/urls/urlBackEnd";


export function productDetail(id) {
    return apiBackEndNoToken.get(URL_BACK_PRODUCT_DETAIL+`${id}`)
}
export function productDetailWithListRelated(id) {
    return apiBackEndNoToken.get(URL_BACK_PRODUCT_DETAIL_RELATED+`${id}`)
}

/**
 * Instance axios to get the list of products
 * 
 * @author Jeremy Dejonghe
 */
export const getProducts = (page) => {

    return apiBackEndNoToken.get(URL_BACK_PRODUCTS + "?page=" + page + "&size=10");
};

export const getTotalProducts = () => {

    return apiBackEndNoToken.get(URL_BACK_TOTAL_PRODUCTS);
};




/**
 * Get X products depending on a field (random, promotion, top sale)
 * 
 * @param {*} field the field used for searching
 * @param {*} numberOfResult the number of products wanted
 * @returns a page containing the number of products wanted
 * @author Cecile
 */
export function getNumberOfProductsByField(field, numberOfResult) {
    return apiBackEndNoToken.get(`${URL_BACK_GET_NUMBER_OF_PRODUCTS_BY_FIELD}${field}/${numberOfResult}`)
}


/**
 * Instance axios to the BACKEND
 *
 *@author luca-t
 */
 export function productSearchCriteria(value,currentPage) {

    return apiBackEndNoToken.post('/public/products/search/',value,currentPage)
}