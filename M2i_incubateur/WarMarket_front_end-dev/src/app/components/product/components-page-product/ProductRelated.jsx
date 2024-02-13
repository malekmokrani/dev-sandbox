import React from 'react';

import { useHistory } from 'react-router-dom';
import { URL_PRODUCTS_DETAILS } from '../../../shared/constants/urls/urlConstants';





export const ProductRelated = ({ product }) => {

    const history = useHistory();



    return (
        <div className=" mt-5 mb-5 w-1/3 p-1 min-w-1/2 min-w-[100%]">
            <img src={product.picture} alt="" className=" hover:cursor-pointer    w-full md: h-2/3  "  onClick={() => {
                let text = window.location.pathname;
                let result = text.substring(0, 17);
                if (result === "/produits/detail/") {
                    history.push(`/produits/detail/${product.id}`)
                    window.location.reload()
                }
                else { history.push(`/produits/detail/${product.id}`) }

            }} />
           <div className="mt-4 p-2 flex flex-col justify-center w-full clip-path productCard">
                <div>
                    <h2 className="m-2 text-center text-xs font-bold truncate">{product.label}</h2>
                </div>
                <div className="flex justify-evenly items-center w-100 mb-2">
                    <div className="price justify-start rounded-2xl p-2">
                        <p className=" text-xs text-white">{product.price} €</p>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default ProductRelated