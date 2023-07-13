import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staffs: [],
    page: 1,
    totalPage: 1,
    limit: 10,
    search: '',
    action: {
        type: '',
        data: {}
    }
}

export const staffSilce = createSlice({
    name: 'staffs',
    initialState,
    reducers: {
        setStaff: (state, actions) => {
            state.staffs = actions.payload.staffs
        },
        removeStaff: (state, actions) => {
            const index = state.staffs.findIndex(item => item.id === actions.payload.id)
            state.staffs.splice(index, 1)
        },
        updateStaff: (state, actions) => {
            const index = state.staffs.findIndex(item => item.id === actions.payload.staff.id)
            state.staffs.splice(index, 1, actions.payload.staff)
        },
        addStaff: (state, actions) => {
            state.staffs = [...state.staffs, actions.payload.staff]
        },

        setAction: (state, actions) => {
            state.action = actions.payload.action
        },

        setPage: (state, actions) => {
            state.page = actions.payload.page
        },

        setTotalPage: (state, actions) => {
            state.totalPage = actions.payload.totalPage
        },

        setSearch: (state, actions) => {
            state.search = actions.payload.search
        }

    }
})

export const { setAction, setStaff, removeStaff, setPage, setTotalPage, updateStaff, addStaff, setSearch } = staffSilce.actions

export default staffSilce.reducer