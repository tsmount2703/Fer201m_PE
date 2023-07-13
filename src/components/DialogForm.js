import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { add, update } from '../api/RESTAPI';
import { api } from '../../src/App';
import { addStaff, updateStaff } from '../core/redux/staff';


export default function DialogForm(props) {

    const action = useSelector(state => state.staffs.action)
    const dispatch = useDispatch()
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    }

    const [name, setName] = React.useState(action?.data?.name)
    const [address, setAddress] = React.useState(action?.data?.address)
    const [age, setAge] = React.useState(action?.data?.age)
    const [image, setImage] = React.useState(action?.data?.avatar)

    const [check1, setCheck1] = React.useState(null)
    const [check2, setCheck2] = React.useState(null)
    const [check3, setCheck3] = React.useState(null)
    const [check4, setCheck4] = React.useState(null)

    // console.log(name, address, age, image)

    const checkEmpty = (param) => param === '' || param === null || param === undefined

    const validate = () => {

        if (checkEmpty(name)) {
            setCheck1(false)
        } else if (name.length < 2) {
            setCheck1(false)
        } else {
            setCheck1(true)
        }
        if (checkEmpty(address)) {
            setCheck2(false)
        } else {
            setCheck2(true)
        }
        if (checkEmpty(age)) {
            setCheck3(false)
        } else {
            if (Number.isInteger(Number(age))) {
                setCheck3(true)
            } else {
                setCheck3(false)
            }
        }

        if (checkEmpty(image)) {
            setCheck4(false)
        } else {
            setCheck4(true)
        }
    }

    const handleSubmit = () => {
        validate()

        if (check1 && check2 && check3 && check4) {
            const newData = {
                ...action.data,
                name: name,
                address: address,
                age: Number(age),
                avatar: image
            }

            if (action.type.includes('Add Staff')) {
                add(api, {
                    ...newData,
                    createdAt: new Date().toISOString()
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        dispatch(addStaff({ staff: data }))
                        toast.success('Add successfully')
                        handleClose()
                    })
                    
            } else if (action.type.includes('Edit Staff')) {
                update(api, newData)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        dispatch(updateStaff({ staff: data }))
                        toast.success('Edit successfully')
                        handleClose()
                    })
            }
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{action.type}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl error={check1 === false ? true : false}
                            variant="standard">
                            <InputLabel htmlFor="component-simple">Name</InputLabel>
                            <Input id="component-simple" defaultValue={action?.data?.name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>

                        <FormControl
                            error={check2 === false ? true : false}
                            variant="standard">
                            <InputLabel htmlFor="component-error">Address</InputLabel>
                            <Input
                                id="component-error"
                                aria-describedby="component-error-text"
                                onChange={(e) => setAddress(e.target.value)}
                                defaultValue={action?.data?.address}
                            />
                        </FormControl>

                        <FormControl
                            error={check3 === false ? true : false}
                            variant="standard">
                            <InputLabel htmlFor="component-error">Age</InputLabel>
                            <Input
                                id="component-error"
                                aria-describedby="component-error-text"
                                onChange={(e) => setAge(e.target.value)}
                                defaultValue={action?.data?.age}
                            />
                        </FormControl>

                        <FormControl
                            error={check4 === false ? true : false}
                            variant="standard">
                            <InputLabel htmlFor="component-error">Image</InputLabel>
                            <Input
                                id="component-error"
                                aria-describedby="component-error-text"
                                onChange={(e) => setImage(e.target.value)}
                                defaultValue={action?.data?.avatar}
                            />
                        </FormControl>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{action.type}</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}