import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { useNavigate, useParams } from "react-router"
import { CardMedia, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

export default function Detail() {

    const { id } = useParams()

    const navigate = useNavigate()

    const staffs = useSelector(state => state.staffs.staffs)

    const staff = staffs?.find(item => item.id === id)

    return (
        <Container maxWidth="md" sx={{ marginTop: '10rem' }}>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <div className='d-flex align-items-center justify-content-between'>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Staff Profile
                            </Typography>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(-1)}>
                                    <ReplyAllIcon />
                                </Button>
                            </CardActions>
                        </div>

                        <Typography variant="h5" component="div">
                            {staff?.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Created At: {format(new Date(staff?.createdAt), 'dd/MM/yyyy')}<br />
                            Age: {staff?.age}<br />
                            Address: {staff?.address}

                        </Typography>
                        <Typography variant="body2">
                            <CardMedia
                                sx={{ margin: '2rem 0' }}
                                component="img"
                                image={staff?.avatar}
                                alt={`Avatar of ${staff?.name}`}
                            />
                        </Typography>
                    </CardContent>

                </Card>
            </Box>
        </Container>


    )
}