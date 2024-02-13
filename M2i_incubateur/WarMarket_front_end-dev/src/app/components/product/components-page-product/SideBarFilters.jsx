import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { getAllCategories, getAllUniverses, getAllTags } from '../../../api/backend/filter';
import SelectFilter from '../../../shared/components/buttons/SelectFilter';
import { categoryFilter, initFilter, selectProductFilter, setPriceRange, tagFilter, universeFilter } from '../../../shared/redux-store/filterProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import PriceInput from '../../../shared/components/form-and-error-components/PriceInput';
import { URL_PRODUCT_FIGURINES, URL_PRODUCT_LIBRAIRIE, URL_PRODUCT_PEINTURES } from '../../../shared/constants/urls/urlConstants';


const SideBarFilters = ({ filters, handleFilters }) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [universes, setUniverses] = useState([]);
    const [tags, setTags] = useState([]);
    const filterStore = useSelector(selectProductFilter);
   
    const handelPriceRande = (values) => {

        if (+values.min <= +values.max) {

            dispatch(setPriceRange(values))

        }
    }

    // Allows to recover data in back
    useEffect(() => {
        //   dispatch( initFilter())
        getAllCategories().then(responses => {
            setCategories(responses.data)
        })

        getAllUniverses().then(responses => {
            setUniverses(responses.data)
        })


        getAllTags().then(responses => {
            setTags(responses.data)
        })


    }, []);

    const isCheckedUniverse = () => {
        try {
            filterStore.universe.includes("")
            return filterStore.universe
        } catch { return [] }
    }


    const isCheckedTags = () => {
        try {
            filterStore.tag.includes("")
            return filterStore.tag
        } catch { return [] }
    }
    const isCheckedCategories = () => {
        try {
            filterStore.category.includes("")
            return filterStore.category
        } catch { return [] }
    }





    const listCategories = categories.map(category => {
        return (
            <CheckFilter
                typeFilter={"category"}
                key={category.id}
                label={category.label}
                handleFilters={handleFilters}
                checked={isCheckedCategories().includes(category.label)}
            />
        )
    });


    const listUniverses = universes.map(universe => {
        return (
            <CheckFilter
                typeFilter={"universe"}
                key={universe.id}
                label={universe.label}
                handleFilters={handleFilters}
                checked={isCheckedUniverse().includes(universe.label)}
            />
        )
    });

    const listTags = tags.map(tag => {
        return (
            <CheckFilter
                typeFilter={"tag"}
                key={tag.id}
                label={tag.label}
                handleFilters={handleFilters}
                checked={isCheckedTags().includes(tag.label)}
            />
        )
    });

    return (
        <div>
            <SelectFilter title="Univers">
                {listUniverses}
            </SelectFilter>
            {window.location.pathname !== URL_PRODUCT_PEINTURES &&
                window.location.pathname !== URL_PRODUCT_FIGURINES &&
                window.location.pathname !== URL_PRODUCT_LIBRAIRIE
                ? <SelectFilter title="Catégories">
                    {listCategories}
                </SelectFilter> : <div className='w-48'></div>}
            <SelectFilter title="Tags">
                {listTags}
            </SelectFilter>
            <SelectFilter title="Prix">
                <PriceInput submit={handelPriceRande} ></PriceInput>
            </SelectFilter>
        </div>
    )
}

export default SideBarFilters;


const CheckFilter = ({ label, handleFilters, checked, typeFilter }) => {
    const dispatch = useDispatch();

    const handleChecked = (e) => {
        if (typeFilter === "universe") {
            dispatch(universeFilter(label))
        }
        if (typeFilter === "category") {
            dispatch(categoryFilter(label))
        }
        if (typeFilter === "tag") {
            dispatch(tagFilter(label))
        }


        handleFilters(label);

    }



    return (
        <div className="ml-8 flex items-center p-2">
            <input type="checkbox" name={label} id={label} checked={checked} onChange={handleChecked} />
            <label htmlFor={label} className="ml-4 mb-0"><p>{label}</p></label>
        </div>
    )
}
