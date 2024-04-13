import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography, Button, Box } from '@mui/material';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const storage = getStorage();

const HouseListingCard = (props) => {
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        props.setInfo("Deleting " + props.address + "...");
    
        const deletePromises = [];
        for (let i = 0; i <= props.numImg; i++) {
            deletePromises.push(deleteObject(ref(storage, `${props.address}/${i}.jpg`)));
        }
    
        try {
            await Promise.all(deletePromises);
        } catch (e) {
            props.setError(e.message);
            props.setInfo('');
            return;
        }
    
        try {
            await deleteDoc(doc(db, "listings", props.address));
            props.fetchListings();
            props.setSuccess("Successfully deleted " + props.address);
        } catch (e) {
            props.setError(e.message);
        }
    
        props.setInfo('');
    };

    const handleRedirect = () => {
      const encodedAddress = encodeURIComponent(props.address);
      navigate(`/listinginfo/${encodedAddress}`);
    }

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', margin: 'px'}}>
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
                src={props.titleImg}
                alt={props.title}
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
      </Box>
      <Grid container direction="column" justifyContent="space-between" sx={{ flex: 1 }}>
        <Grid item>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" color="primary" sx={{ fontWeight: 600 }}>
              {props.address}
            </Typography>
            <Typography gutterBottom variant="body" component="div" color="primary" sx={{ fontWeight: 600 }}>
              $ {props.price}
            </Typography>
            <Typography variant="body2">
              {props.bed} Bed | {props.bath} Bath
            </Typography>
            <Typography variant="body1" marginTop="1em">
              {props.blurb}
            </Typography>

            {props.sold && (<Typography variant="body1" color="error">SOLD</Typography>)}
            <Button variant="contained" color="primary" sx={{margin: "1em 0"}} onClick={() => handleRedirect()}>Learn More</Button>
            {props.admin && (
              <Button variant="contained" color="error" sx={{margin: "1em 0"}} onClick={() => handleDelete()}>Delete Listing</Button>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HouseListingCard;
