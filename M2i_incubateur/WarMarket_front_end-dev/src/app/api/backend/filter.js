import apiBackEnd from "./api.BackendWithToken"
import apiBackEndNoToken from "./api.Backend"

import { URL_FILTER_CATEGORIES, URL_FILTER_UNIVERSES, URL_FILTER_TAGS } from "../../shared/constants/urls/urlBackEnd";


/**
 * Instance axios to get the list of categories, universes, tags
 * 
 * @author Jeremy Dejonghe
 */
export const getAllCategories = () => {

    return apiBackEndNoToken.get(URL_FILTER_CATEGORIES);
};

export const getAllUniverses = () => {

    return apiBackEndNoToken.get(URL_FILTER_UNIVERSES);
};

export const getAllTags = () => {

    return apiBackEndNoToken.get(URL_FILTER_TAGS);
};