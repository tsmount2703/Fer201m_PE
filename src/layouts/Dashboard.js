import * as React from 'react';

import { Button, Grid, Pagination } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { get } from '../api/RESTAPI';
import { setAction, setPage, setSearch, setStaff, setTotalPage } from '../core/redux/staff';
import { api } from '../App';
import TableComponent from '../components/Table';
import DialogForm from '../components/DialogForm';

export default function Dashboard() {

    const state = useSelector(state => state.staffs)

    const dispatch = useDispatch()


    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        get(api)
            .then(res => res.json())
            .then(data => {
                if (state?.search) {
                    data = data.filter(item => item.name.toLowerCase().includes(state?.search.toLowerCase()))
                }
                const totalPage = Math.ceil(data?.length / 10)
                dispatch(setTotalPage({ totalPage: totalPage }))

                if (state.page) {
                    data = data.slice((state.page - 1) * 10, state.page * 10)
                }
                dispatch(setStaff({ staffs: data }))
            })
    }, [state?.search, state?.page, state?.totalPage, dispatch])

    const handleChange = (event, value) => {
        dispatch(setPage({ page: value }))
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">

            <Grid item >
                <div className='d-flex justify-content-center align-items-end my-2'>
                    <div className='col'>
                        <Button variant="contained" color="primary" sx={{ marginRight: '1rem', marginTop: '6rem' }} onClick={() => {
                            setOpen(true)
                            dispatch(setAction({
                                action: {
                                    type: 'Add Staff',
                                    data: {}
                                }
                            }))
                        }}>
                            Add
                        </Button>
                    </div>
                    {
                        open === true ? (<DialogForm open={open} setOpen={setOpen} />) : null
                    }
                    <div className='col-3'>
                        <input className='form-control' type="text" placeholder="Search" onChange={(e) => {
                            dispatch(setSearch({search: e.target.value}))
                            dispatch(setPage({ page: 1 }))
                        }} />
                    </div>
                </div>
                <div className='d-flex justify-content-end align-items-center my-4'>
                    <span>Total: {state?.staffs?.length} records</span>
                    <Pagination count={state?.totalPage} page={state?.page} onChange={handleChange} color="secondary" />
                </div>

                <TableComponent setOpen={setOpen} />

            </Grid>
        </Grid>
    );
}