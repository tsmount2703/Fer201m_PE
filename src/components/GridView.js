import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import VisibilityIcon from '@mui/icons-material/Visibility';


import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

import { format } from 'date-fns'
import { Link } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function GridView() {

    const staffs = useSelector(state => state.staffs.staffs)

    return (
        <Container maxWidth="false">
            <Box sx={{ flexGrow: 1, marginTop: '10rem' }}>
                <Grid container spacing={2}>
                    <Grid container sm={12} spacing={4}>
                        {
                            staffs?.map(item => (
                                <Grid xs={6} lg={3}>
                                    <Item>
                                        <Card >
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe"
                                                        src={item.avatar}
                                                        alt={item.name}
                                                    >
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <Link to={`/detail/${item.id}`} >
                                                            <VisibilityIcon />
                                                        </Link>
                                                    </IconButton>
                                                }
                                                title={item.name}
                                                subheader={format(new Date(item.createdAt), 'dd/MM/yyyy')}
                                            />
                                            <CardMedia
                                                component="img"
                                                height={'300'}
                                                image={item.avatar}
                                                alt={`Avatar of ${item.name}`}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    Age: {item.age}<br />
                                                    Address: {item.address}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Item>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Box>
        </Container>

    )
}