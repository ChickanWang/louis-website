import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography, Button } from '@mui/material';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

const storage = getStorage();

const HouseListingCard = (props) => {
    
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

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px'}}>
      <CardMedia
        component="img"
        src={props.titleImg}
        alt={props.title}
        sx={{
          width: 400,
          height: 300,
          objectFit: 'cover',
          '@media (max-width: 600px)': {
            width: 300, // Width on mobile
            height: 180, // Height on mobile
          }
        }}
      />
      <Grid container direction="column" justifyContent="space-between" sx={{ flex: 1 }}>
        <Grid item>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.address}
            </Typography>
            <Typography variant="body2">
              {props.bed} Bed | {props.bath} Bath | {props.sqft} sqft
            </Typography>
            <Typography variant="body1" marginTop="1em">
              {props.blurb}
            </Typography>

            {props.sold && (<Typography variant="body1" color="error">SOLD</Typography>)}
            <Button variant="contained" color="primary" sx={{margin: "1em 0"}}>Learn More</Button>
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
