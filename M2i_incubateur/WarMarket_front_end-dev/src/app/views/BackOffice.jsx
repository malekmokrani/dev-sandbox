import { ClipboardListIcon, CollectionIcon, ArchiveIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { URL_ORDERS_COMMERCIAL } from "../shared/constants/urls/urlConstants";
import LabelPannel from "../shared/components/pannel/LabelPannel"

/**
 * The user page account with multiple links (cart, user infos, orders...)
 *
 * @returns the AccountView page
 */

 const BackOffice = () => {
    const history = useHistory()
    const [showPannelLabel, setPannelLabel] = useState(true);

    return (
        <div className="justify-center  item-center p-10 space-y-12">

            <div className='flex justify-center m-2 text-xs w-full'>
                <button className="paiementCart h-1/4 w-64" onClick={()=>{history.push(URL_ORDERS_COMMERCIAL)}} >
                    <div className="grid grid-cols-4">
                        <p className="lg:text-lg text-xs lg:text:md col-span-3 lg:col-span-3  mt-2 pl-2 lg:mt-1 mobile:text-xs">GESTION  ORDERS</p>
                        <ClipboardListIcon className="lg:w-7 w-6 m-1 ml-2 "></ClipboardListIcon>
                    </div>
                </button>
            </div>
<div>
            <div className='flex justify-center m-2 text-xs w-full'>
                <button className="paiementCart h-1/4 w-64" onClick={()=>{setPannelLabel(!showPannelLabel)}} onFocus={()=>{console.log(showPannelLabel)}} >
                    <div className="grid grid-cols-4">
                        <p className="lg:text-lg text-xs lg:text:md col-span-3 lg:col-span-3  mt-2 pl-2 lg:mt-1 mobile:text-xs">GESTION LABELS</p>
                        <ArchiveIcon className="lg:w-7 w-6 m-1 ml-2 "></ArchiveIcon>
                    </div>
                </button>

            </div>

            <LabelPannel showPannelLabel={showPannelLabel}></LabelPannel>
            </div>

        </div>
    )

}


export default BackOffice;