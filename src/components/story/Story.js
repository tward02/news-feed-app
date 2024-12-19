import React from 'react';
import classes from './Story.module.css'
import {Card, CardContent, CardHeader, CardMedia, Link, Typography} from "@mui/material";

const Story = ({story}) => {

    return (
        <Card sx={{maxWidth: '95%'}} className={classes.story}>
            <CardHeader id={`header.${story.uuid}`} title={story.title}
                        subheader={story.source + " " + new Date(story.published_at).toLocaleString()}/>
            <CardMedia
                id={`media.${story.uuid}`}
                component="img"
                image={story.image_url}
                alt={story.description}
            />
            <CardContent id={`content.${story.uuid}`}>
                <Typography variant="body1" sx={{color: 'text.secondary', textAlign: 'left'}}>
                    {story.description}
                </Typography>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    textAlign: 'left',
                    borderTop: "solid 1px",
                    paddingTop: "10px",
                    marginTop: "10px"
                }}>
                    {story.snippet + " "}
                    <Link aria-label={story.title + ', ' + story.description + ' Read the full article here'}
                          href={story.url} underline="always" target="_blank" rel="noopener noreferrer"
                          component={"button"} onClick={() => window.open(story.url)}>
                        Read the full article here
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Story;
