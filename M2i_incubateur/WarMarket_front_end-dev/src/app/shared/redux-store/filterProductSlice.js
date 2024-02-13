import { createSlice } from "@reduxjs/toolkit";

const tot = (total, itemPerPage) => {

    var pages = []
    for (let i = 0; i <= Math.ceil(total / itemPerPage) - 1; i++) {
        pages.push(i);
    }
    return pages
}

const initialState = {

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


}
export const filterProductSlice = createSlice({

    name: 'filterProducts',
    initialState: initialState,
    reducers: {
        initFilter(state) {
            var fSelect = localStorage.getItem("filters")
            state.page = 0
            state.totalpage = tot(state.total, state.pageSize)

            if (state !== fSelect) {
                localStorage.removeItem("filters")

            }


        }, initFilterByPage(state, { payload }) {

            var list = [payload]
            state.category = list
            state.label = "",
               
                state.page = 0
            state.totalpage = tot(state.total, state.pageSize)

            localStorage.setItem("filters", JSON.stringify(state))

        },
        labelFilter(state, { payload }) {
            state.label = payload
            state.page = 0
            state.totalpage = tot(state.total, state.pageSize)
            localStorage.setItem("filters", JSON.stringify(state))

        },
        universeFilter(state, { payload }) {
            if (state.universe === null) {
                var list = [payload]
                state.universe = list
            } else {
                if (state.universe.includes(payload)) { state.universe.splice(state.universe.indexOf(payload), 1); }
                else { state.universe.push(payload) }
            }
            state.page = 0
            state.totalpage = tot(state.total, state.pageSize)

            localStorage.setItem("filters", JSON.stringify(state))

        },
        categoryFilter(state, { payload }) {
            if (state.category === null) {
                var list = [payload]
                state.category = list
            } else {
                if (state.category.includes(payload)) { state.category.splice(state.category.indexOf(payload), 1); }
                else { state.category.push(payload) }
            }
            state.page = 0
            state.totalpage = tot(state.total, state.pageSize)

            localStorage.setItem("filters", JSON.stringify(state))

        },
        tagFilter(state, { payload }) {
            if (state.tag === null) {
                var list = [payload]
                state.tag = list
            } else {
                if (state.tag.includes(payload)) { state.tag.splice(state.tag.indexOf(payload), 1); }
                else { state.tag.push(payload) }
            }

            state.page = 0
            state.totalpage = tot(state.total, state.pageSize)

            localStorage.setItem("filters", JSON.stringify(state))

        },
        removeFilter(state, { payload }) {
            if (state.universe !== null && state.universe.includes(payload)) { state.universe.splice(state.universe.indexOf(payload), 1); }
            if (state.tag !== null && state.tag.includes(payload)) { state.tag.splice(state.tag.indexOf(payload), 1); }
            if (state.category !== null && state.category.includes(payload)) { state.category.splice(state.category.indexOf(payload), 1); }

            state.page = 0
            state.totalpage = tot(state.total, state.pageSize)

            localStorage.setItem("filters", JSON.stringify(state))

        },
        setCurrentPageFilter(state, { payload }) {

            if (payload > -1) {
                state.page = payload

            }
            state.totalpage = tot(state.total, state.pageSize)

            localStorage.setItem("filters", JSON.stringify(state))

        }
        , setTotal(state, { payload }) {

            state.total = payload
            state.totalpage = tot(state.total, state.pageSize)


            localStorage.setItem("filters", JSON.stringify(state))

        }
        , setPriceRange(state, { payload }) {
            if (payload.min === "" || payload.min < 0) { state.minPrice = 0 } else { state.minPrice = payload.min }
            if (payload.max === "" || payload.max < 0) { state.maxPrice = 10000 } else { state.maxPrice = payload.max }




            localStorage.setItem("filters", JSON.stringify(state))

        }
    }
})

export const { labelFilter, universeFilter, categoryFilter, tagFilter, initFilter,
    removeFilter, setCurrentPageFilter, setTotal, setPriceRange, initFilterByPage } = filterProductSlice.actions
export const selectProductFilter = (state) => state.filterProducts
export const selectPage = (state) => state.filterProducts.page
export const selectTotal = (state) => state.filterProducts.total
export const selectTotalPages = (state) => state.filterProducts.totalpage

export default filterProductSlice.reducer