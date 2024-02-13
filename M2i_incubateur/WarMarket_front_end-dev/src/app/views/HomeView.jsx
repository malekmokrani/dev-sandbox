import React, { useEffect, useState } from 'react';
import { getNumberOfProductsByField, productSearchCriteria } from "../api/backend/product";
import ProductHomePageCard from '../components/product/ProductHomePageCard';

import Loader from './../shared/components/utils-components/Loader';
import handleHttpError from './../shared/components/form-and-error-components/HandleHttpError';
 import img_carousel_1 from "../assets/images/carousel01.jpg"
 import img_carousel_2 from "../assets/images/carousel02.jpg"

 import img_carousel_4 from "../assets/images/carousel04.jpg"
 import img_carousel_5 from "../assets/images/carousel05.jpg"
import 'tw-elements';


/**
 * The view file for the home page of the website
 * 
 * @param {*} param0 
 * @returns the view of the home page
 * 
 * @author Cecile
 */
const HomeView = ({ history }) => {

    const [productsRandom, setProductsRandom] = useState([]);
    const [productsPromotion, setProductsPromotion] = useState([]);
    const [productsTopSale, setProductsTopSale] = useState([]);
    const [loadingRandom, setLoadingRandom] = useState(true);
    const [loadingPromotion, setLoadingPromotion] = useState(true);
    const [loadingTopSale, setLoadingTopSale] = useState(true);

    useEffect(() => {

        if( !localStorage.getItem("filters")){
            localStorage.setItem("filters",JSON.stringify({
        
                label: "",
                price: null,
                universe: null,
                category: null,
                tag: null,
                page: 0,
                pageSize: 9,
                total: 0,
                totalpage: [],
                minPrice: 0,
                maxPrice: 10000
            
            
            }))
        }
        if (localStorage.getItem("successPaiement")) {

            localStorage.removeItem("successPaiement")

        }

        getNumberOfProductsByField('random', 3)
            .then(response => {
                response.status === 200 && setProductsRandom(response.data);
                setLoadingRandom(false);
            })
            .catch((error, response) => {
                handleHttpError(error)
            })

        getNumberOfProductsByField('promotion', 3)
            .then(response => {
                response.status === 200 && setProductsPromotion(response.data);
                setLoadingPromotion(false);
            })
            .catch((error, response) => {
                handleHttpError(error)
            })

        getNumberOfProductsByField('topsale', 3)
            .then(response => {
                response.status === 200 && setProductsTopSale(response.data);
                setLoadingTopSale(false);
            }


            )
            .catch((error, response) => {
                handleHttpError(error)
            })
    }, [])



    return (
      
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default pb-8 p-5">

      
            <div className='text-primary-500 font-extrabold w-full '>
             
                {loadingRandom ? < Loader /> :
                    <>
                <div className="relative">
    
                <div    id="carouselExampleIndicators" 
                        className="carousel slide relative pb-5 mb-5  m-auto w-full" 
                        data-bs-ride="carousel">
                
                    <div className="carousel-indicators m-0 absolute bottom-5 md:bottom-10 text-black flex justify-center p-0 w-full  " >
                        <button type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="0"
                                className="active "
                                aria-current="true"
                                aria-label="Slide 1" />
                        
                        <button type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="1"
                                aria-label="Slide 2" />
                        
                        <button type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"/>

                          <button type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to="3"
                                aria-label="Slide 4"/>
                        </div>
                        <div className="carousel-inner relative w-full overflow-hidden border-4 border-yellow-500 navbar-color">
                            <div className="carousel-item active float-left w-full">
                                <div
                                    className="m-auto object-cover" 
                              
                                    alt="Warhammer001"
                                 > 
                                     <img src={img_carousel_1} className="w-full"/> 
                                </div>
                            </div>
                            <div className="carousel-item float-left w-full">
                            <div
                                    className="m-auto object-cover  " 
                                
                                    alt="Warhammer001"
                                    > 
                                    <img src={img_carousel_2}  className="w-full"/> 
                               </div>
                            </div>
                            <div className="carousel-item float-left w-full">
                            <div
                                    className="m-auto object-cover   " 
                                    alt="Warhammer001"
                                    > 
                                    <img src={img_carousel_4}  className="w-full"/> 
                               </div>
                            </div>
                            <div className="carousel-item float-left w-full">
                            <div
                                    className="m-auto object-cover  " 
                                    alt="Warhammer001"
                                >
                                <img src={img_carousel_5}  className="w-full"/> 
                                </div>
                            </div>
                        </div>
                        
                        <button
                                className="carousel-control-prev absolute top-0 bottom-5 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button"    data-bs-target="#carouselExampleIndicators"    data-bs-slide="prev">

                            <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>

                        </button>
                        <button
                                className="carousel-control-next absolute top-0 bottom-5 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                type="button"   data-bs-target="#carouselExampleIndicators" data-bs-slide="next">

                            <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
            
                        </button>
            
                    </div>
            </div>
                        <div className="text-center pb-2">
                            <h2 className="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Notre boutique
                            </h2>

                        </div>
                        <div className="w-full bg-custom-lightbrown">
                            <section className="w-full mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsRandom.map((product) =>
                                        <ProductHomePageCard
                                            key={product.id}
                                            product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
                <br />

                {loadingPromotion ? < Loader /> :
                    <>
                        <div className="text-center pb-2">
                            <h2 className="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Nos promotions
                            </h2>
                        </div>
                        <div className="w-full bg-custom-orange">
                            <section className="w-full mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsPromotion.map((product) =>
                                        <ProductHomePageCard
                                            key={product.id}
                                            product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
                <br />
                {loadingTopSale ? < Loader /> :
                    <>
                        <div className="text-center pb-2">
                            <h2 className="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Les tops ventes
                            </h2>
                        </div>
                        <div className="w-full bg-custom-green">
                            <section className="w-full mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsTopSale.map((product) =>
                                        <ProductHomePageCard
                                            key={product.id}
                                            product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
          
        </div>

         
        </div>
    );

}

export default HomeView;
