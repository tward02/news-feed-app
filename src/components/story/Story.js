import React from 'react';
import classes from './Story.module.css'
import {Card, CardContent, CardHeader, CardMedia, Link, Typography} from "@mui/material";

const Story = ({story}) => {

    return (
        <Card sx={{maxWidth: '95%'}} className={classes.story}>
            <CardHeader title={story.title} subheader={new Date(story.published_at).toLocaleString()}/>
            <CardMedia
                component="img"
                image={story.image_url}
                alt={story.description}
            />
            <CardContent>
                <Typography variant="body1" sx={{color: 'text.secondary', textAlign: 'left'}}>
                    {story.description}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary', textAlign: 'left'}}>
                    {story.snippet + " "}
                    <Link aria-label={story.title + ', ' + story.description + ' Read the full article here'}
                          href={story.url} underline="always" target="_blank" rel="noopener noreferrer"
                          component={"button"}>
                        Read the full article here
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Story;
