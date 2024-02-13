import React, { useEffect, useState } from "react";
import { DocumentDownloadIcon, SwitchHorizontalIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import ProductRelated from "../../product/components-page-product/ProductRelated";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import logo from "../../../assets/images/icones/logo/warhammer-shop-logo.png";
import { Link } from "react-router-dom";
import { URL_ORDERS_COMMERCIAL, URL_ORDER_RETURN } from "../../../shared/constants/urls/urlConstants";
import OrderDetailsTable from "./OrderDetailsTable";
import { accountLogin, accountRoles, hasRole } from "../../../shared/services/accountServices";
import { ROLE_SALESMAN } from "../../../shared/constants/rolesConstant";
import { updateStatusOrderById } from "../../../api/backend/order";
import ModalStatusOrder from "../../../shared/components/utils-components/Modal/ModalStatusOrder";
import useModal from "../../../shared/components/utils-components/Modal/useModal";


const OrderDetails = ({ id, productsOrder, total, status, date, address, profile, subTotal, mailOrder }) => {
    const [statusOrder, setStatusOrder] = useState(status)
    const [newStatus, setNewStatus] = useState('')
    const { isShowing: isShowed, toggle: toggle } = useModal();


    useEffect(() => {
        setStatusOrder(status)
    }, [status])

    const confirmUpdateModal = (value) => {
        if (hasRole(ROLE_SALESMAN))



            toggle()
        setNewStatus(value)

    }



    const updateStatus = (newstatus) => {

        if (hasRole(ROLE_SALESMAN)) {
            const orderStatus = { idOrder: id, status: newstatus }
            updateStatusOrderById(orderStatus).then(res => {
                if (res.status === 200) {
                    setStatusOrder(newstatus)
                    toggle()
                }
            })

        }
    }



    const addrString = () => {
        var s = new String(address);
        return s.toLocaleUpperCase()
    }


    const liv = () => {
        if (subTotal * 1.2 < 25) { return 10 + "€" } else { return "OFFERT" }
    }
    const pdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        doc.text("Warhammer Market", 5, 10);
        doc.text("Siret:789456123789", 5, 15);
        doc.text("N° TVA:FR789878978789", 5, 20);


        doc.text("Order: " + id, 10, 30);
        doc.text("Date: " + date, 10, 35);
        doc.text("Client: " + profile, 10, 40);
        doc.text("Livraison: " + "(a domicile)", 10, 45);

        doc.text(addrString(), 10, 50);




        doc.addImage(logo, 'PNG', 85, 5, 50, 20);
        doc.output('datauri');
        const columns = ["Label", "Prix unitaire HT", "Quantite", "Prix Total HT"];
        const rows = [];
        // here you go trought the arary products pushing only the values to the rows array
        productsOrder.map(item => {
            const totRow = (+ item.price * +item.quantite)
            const row = {
                label: item.label,
                price: item.price + "€",
                quantite: item.quantite,
                totRow: totRow + "€",


            }
            rows.push(Object.values(row))
        })

        doc.autoTable(columns, rows, {

            styles: {
                fontSize: 12
            },
            startY: 70,
        })
        const columns2 = ["TOT HT", "TOT TVA", "LIVRAISON", "TOT"];
        const rows2 = [];

        const row2 = {
            Totht: (subTotal).toFixed(2) + "€",
            TotalTVA: (subTotal * 0.2).toFixed(2) + "€",
            Livraison: liv(),
            Total: total.toFixed(2) + "€",
        }
        rows2.push(Object.values(row2))

        doc.autoTable(columns2, rows2, {

            styles: {
                fontSize: 12
            },
            startY: doc.lastAutoTable.finalY + 10,
        })




        doc.save(id + "-" + date + ".pdf"); // will save the file in the current working directory
    }





    return (

        <div className="">
            <ModalStatusOrder
                isShowing={isShowed}
                hide={toggle}
                status={statusOrder}
                newStatus={newStatus}
                confirm={() => updateStatus(newStatus)}
            ></ModalStatusOrder>

            <div className="  grid grid-cols-5 lg:flex lg:flex-row   ">

                <div className="mt-3 grid  content-start  ml-1 ">
                    <h1 className="font-bold text-2xl mt-4 pl-2">Order id: {id}</h1>
                    <h2 className="font-bold text-1xl pl-2 mt-4"> {date}</h2>
                    {statusOrder !== "Annule" ? <div className="flex justify-start pl-2 font-bold   mb-5">Telecharger  PDF
                        <button onClick={() => pdf()}> <DocumentDownloadIcon className="h-8 w-8 p-0 p-0" ></DocumentDownloadIcon></button></div>
                        : null}
       {hasRole(ROLE_SALESMAN) && <>              { statusOrder !== 'Annule' ?
                        <div className="content border-2 hover:cursor-pointer  bg-red-500 text-white mt-3 mb-3 w-32" onClick={() => {

                            if (hasRole(ROLE_SALESMAN)) confirmUpdateModal('Annule')
                        }}>
                            <p>    ANNULLER ORDER</p>
                        </div> : <div className="content border-2 hover:cursor-pointer  bg-yellow-500 text-white mt-3 mb-3 w-32" onClick={() => { if (hasRole(ROLE_SALESMAN)) confirmUpdateModal('En cours de traitement') }}>
                            <p>    RESTAURER ORDER</p>
                        </div>

                    }</>}
                    {statusOrder === "Annule" ? <div className="mt-5"><XCircleIcon className="h-8 w-8"></XCircleIcon>La commande a été annulée</div> :


                        <>



                            <div className="container-stepper ">

                                <div className={statusOrder === "En cours de traitement" ? "step active" : "step completed"}>
                                    <div class="v-stepper">
                                        <div className="circle"></div>
                                        <div className="line"></div>
                                    </div>

                                    <div className={statusOrder === "En cours de traitement" ? "content-active " : "content-completed border-2  hover:cursor-pointer"} onClick={() => {
                                        if (hasRole(ROLE_SALESMAN) && statusOrder !== "En cours de traitement") { confirmUpdateModal("En cours de traitement") }
                                    }}>
                                        <p>   En cours de traitement </p>
                                    </div>
                                </div>
                                {statusOrder !== "En cours de traitement" ?
                                    <div className={statusOrder === "Prêt a expédier" ? "step active" : "step completed"}>
                                        <div className="v-stepper">
                                            <div className="circle"></div>
                                            <div className="line"></div>
                                        </div>

                                        <button onClick={() => {
                                            if (hasRole(ROLE_SALESMAN) && statusOrder !== "Prêt a expédier") { confirmUpdateModal("Prêt a expédier") }
                                        }} >                    <div className={statusOrder === "Prêt a expédier" ? "content-active" : "content-completed  border-2  hover:cursor-pointer"}>
                                                <p>  Prêt a expédier  </p>                         </div></button>
                                    </div>
                                    : <div className="step">
                                        <div class="v-stepper">
                                            <div className="circle"></div>
                                            <div className="line"></div>
                                        </div>

                                        <div className="content border-2 hover:cursor-pointer" onClick={() => { if (hasRole(ROLE_SALESMAN)) confirmUpdateModal("Prêt a expédier") }}>
                                            <p>    Prêt a expédier</p>
                                        </div>
                                    </div>}


                                {statusOrder !== "En cours de traitement" && statusOrder !== "Prêt a expédier" ?


                                    <div className={statusOrder === "Livraison en cours" ? "step active" : "step completed"}>

                                        <div className="v-stepper">
                                            <div className="circle"></div>
                                            <div className="line"></div>
                                        </div>

                                        <div
                                            onClick={() => {
                                                if (hasRole(ROLE_SALESMAN) && statusOrder !== " Livraison en cours") { confirmUpdateModal("Livraison en cours") }
                                            }}
                                            className={statusOrder === "Livraison en cours" ? "content-active" : "content-completed  border-2  hover:cursor-pointer"}
                                        >
                                            <p> Livraison en cours</p>
                                        </div>
                                    </div> : <div className="step">
                                        <div className="v-stepper">
                                            <div className="circle"></div>
                                            <div className="line"></div>
                                        </div>

                                        <div className="content border-2  hover:cursor-pointer" onClick={() => { if (hasRole(ROLE_SALESMAN)) confirmUpdateModal("Livraison en cours") }}>
                                            <p> Livraison en cours</p>
                                        </div>
                                    </div>}

                                {statusOrder === "Livre" ?
                                    <div className="step active">
                                        <div className="v-stepper">
                                            <div className="circle"></div>
                                            <div className="line"></div>
                                        </div>

                                        <div className="content-active w-40  lg:w-32">
                                            <p className="font-bold">Livré</p>
                                        </div>
                                    </div>
                                    : <div className="step">
                                        <div className="v-stepper">
                                            <div className="circle"></div>
                                            <div className="line"></div>
                                        </div>

                                        <div className="content border-2 rounded rounded-lg hover:cursor-pointer w-40 lg:w-32" onClick={() => { if (hasRole(ROLE_SALESMAN)) confirmUpdateModal("Livre") }}>
                                            <p>Livré</p>
                                        </div>
                                    </div>}
                                {statusOrder !== "Annule" && mailOrder === accountLogin() && !hasRole(ROLE_SALESMAN) ?
                                    <Link to={{
                                        pathname: URL_ORDER_RETURN,
                                        state: {
                                            orderId: id,
                                            date: date,
                                            status: statusOrder,
                                            productsOrder: productsOrder,
                                            total: total,
                                            address: address,
                                            subTotal: subTotal
                                        }
                                    }}>
                                        <button className="w-full ml-2"><div className="mt-8 font-bold   "

                                        >


                                            <div > <p className="mb-2">Voulez-vous faire un retour?</p>

                                                <p className="mb-2">Or  annuler une commande?</p>
                                                <p className="mb-2">Contactez-nous!
                                                </p> <div className="mt-5 flex justify-center ">  <SwitchHorizontalIcon className="w-8 h-8"></SwitchHorizontalIcon></div>
                                            </div>



                                        </div></button></Link>
                                    : null}
                            </div>







                        </>}
                </div>



                <div className="text-xs  col-span-4 p-3 mt-10 ml-16 pl-8 lg:w-full ">
                    <OrderDetailsTable productsOrder={productsOrder} total={total} status={statusOrder} address={address} subTotal={subTotal} />


                </div>




            </div>

            <h1 className="font-bold text-xl mt-10 ml-3">   Produits liés à cet order</h1>
            <div className="flex justify-around mb-10">

                <div className=" flex flex-wrap w-96  lg:grid grid-cols-3 justify-between w-full  lg:w-full  ">

                    {productsOrder !== undefined ? productsOrder.map((element, index) => <>
                        {
                            index < 100 ?
                                <ProductRelated product={element} />
                                : null}</>



                    ) : null}

                </div></div>





        </div>

    );
};

export default OrderDetails;