import React, { useEffect, useState } from 'react'
import { productDetail, productSearchCriteria, productDetailWithListRelated } from "../api/backend/product";
import ProductDetails from "../components/product/ProductDetails"
import { useParams } from "react-router-dom";
import { selectCart } from '../shared/redux-store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { initFilter, selectProductFilter, setCurrentPageFilter, setTotal, universeFilter } from '../shared/redux-store/filterProductSlice';



const ProductDetailView = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState([])
    const id = useParams().id
    const [cart, setCart] = useState({})
    const carts = useSelector(selectCart)
    const [cartQuantity, setCartQuantity] = useState()
    const [productRelated, setProductRelated] = useState([])

    useEffect(() => {



        productDetailWithListRelated(id).then(res => {
            setProduct(res.data.content)
            setProductRelated(res.data.relatedContent)

            var cartFind = carts.find(x => x.id === res.data.content.id)

            if (cartFind !== undefined) {
                setCart(cartFind)
                setCartQuantity(cartFind.quantite)
            }
            else { setCart(null) }




        }

        )



    }, [id, cartQuantity, cart])
    return (
        <div className="flex items-center justify-center   mb-8 md:m-10">
            <ProductDetails
                picture={product.picture}
                label={product.label}
                price={product.price}
                description={product.description}
                stock={product.stock}
                id={product.id}
                cart={cart}
                cartQuantity={cartQuantity}
                productRelated={productRelated}

            />
        </div>
    );
};

export default ProductDetailView;