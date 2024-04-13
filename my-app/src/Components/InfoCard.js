import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography, Box } from '@mui/material';

const InfoCard = (props) => {
  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', margin: '1em'}}>
      
       {props.right === false && 
       <Box
            sx={{
            margin: '1em', // Adds space around the Box, creating a gap between the border and the image
            border: '1px solid lightgrey', // Black border around the Box
            width: { xs: 270, md: 402 }, // Width adjusted to include the border and margin
            height: { xs: 182, md: 302 }, // Height adjusted to include the border and margin
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            }}
        >
            <CardMedia
                component="img"
                src={props.img}
                alt={props.alt}
                sx={{
                margin: '1em',
                width: 390,
                height: 290,
                objectFit: 'cover',
                borderRadius: '8px',
                '@media (max-width: 900px)': {
                    width: 290, // Width on mobile
                    height: 170, // Height on mobile
                }
                }}
            />
      </Box> }
      <Grid container direction="column" justifyContent="space-between" sx={{ flex: 1 }}>
        <Grid item>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" color="primary" sx={{ fontWeight: 600 }}>
              {props.header}
            </Typography>
            <Typography variant="body1" marginTop="1em">
              {props.content}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      { props.right === true &&
      <Box
            sx={{
            margin: '1em', // Adds space around the Box, creating a gap between the border and the image
            border: '1px solid lightgrey', // Black border around the Box
            width: { xs: 270, md: 402 }, // Width adjusted to include the border and margin
            height: { xs: 182, md: 302 }, // Height adjusted to include the border and margin
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            }}
        >
            <CardMedia
                component="img"
                src={props.img}
                alt={props.alt}
                sx={{
                margin: '1em',
                width: 390,
                height: 290,
                objectFit: 'cover',
                borderRadius: '8px',
                '@media (max-width: 900px)': {
                    width: 290, // Width on mobile
                    height: 170, // Height on mobile
                }
                }}
            />
      </Box>}
    </Card>
  );
};

export default InfoCard;
