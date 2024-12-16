import React from 'react';
import classes from './Story.module.css'
import {Card, CardContent, CardHeader, CardMedia, Link, Typography} from "@mui/material";

const Story = ({story}) => {

    return (
        <Card sx={{ maxWidth: '30%' }}>
            <CardHeader title={"Były minister zdrowia w nowym programie Gońca"} subheader="September 14, 2016"/>
            <CardMedia
                component="img"
                // height="300"
                image="https:\/\/static.wirtualnemedia.pl\/media\/new\/top\/675f3809ab843_balicki-gonieczdrowie.jpg"
                alt="News Story"
            />
            <CardContent>
                <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                    {"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like." + " "}
                    <Link href="#" underline="always">
                        View full article here
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Story;