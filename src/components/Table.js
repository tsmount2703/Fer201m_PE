import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CardMedia } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useDispatch, useSelector } from 'react-redux';

import { format } from 'date-fns';
import { remove } from '../api/RESTAPI';
import { api } from '../App';
import { removeStaff, setAction } from '../core/redux/staff';
import { toast } from 'react-toastify';

export default function TableComponent(props) {
    const state = useSelector(state => state.staffs)

    const { setOpen } = props

    const dispatch = useDispatch()

    const handleDelete = (id) => {

        const confirm = window.confirm('Are you sure?')

        if (!confirm) return

        remove(api, id)
            .then(() => {
                dispatch(removeStaff({ id: id }))
                toast.success('Delete Success', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                });
            })
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>

            <Table sx={{ width: '70rem' }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">age</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Create Date</TableCell>
                        <TableCell align="center">Avatar</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state?.staffs?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.age}</TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                            <TableCell align="center">{format(new Date(row.createdAt), 'dd/MM/yyyy')}</TableCell>
                            <TableCell align="center">
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={row.avatar}
                                    title="green iguana"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="contained" bg="primary" sx={{ marginRight: '1rem' }} onClick={() => {
                                    setOpen(true)
                                    dispatch(setAction({
                                        action: {
                                            type: 'Edit Staff',
                                            data: row
                                        }
                                    }))
                                }} >
                                    <EditIcon />
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                                    <DeleteRoundedIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}