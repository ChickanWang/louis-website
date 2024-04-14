import React, { useState, useEffect, useCallback } from 'react';
import ListingCard from '../Components/ListingCard';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { Typography, Divider } from '@mui/material';
import { Box } from '@mui/material';

function SoldPage(props) {
    const [listings, setListings] = useState([]);
    const storage = getStorage();

    const fetchListings = useCallback(async () => {
        try {
          const querySnapshot = await getDocs(query(collection(db, "listings"), where("sold", "==", true)));
          const listingsArray = querySnapshot.docs.map(doc => doc.data());
          var imageArray = [];

          for (let i = 0; i < listingsArray.length; i++) {
            const url = await getDownloadURL(ref(storage, `${listingsArray[i].address}/${0}.jpg`));
            imageArray.push(url);
      }

          const zipped = listingsArray.map((item, index) => ({
              ...item,
              titleImg: imageArray[index],
          }));

          setListings(zipped);
        } catch (e) {
            console.log(e.message);
        }
    }, [storage]);

    useEffect(() => { fetchListings(); }, [fetchListings]);


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',  // Centers the content horizontally
            padding: '0 5em',  // Adds padding around the box
            backgroundColor: '#E6E8E6',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                mt: '1.5em',
                height: '50%',
                width: {
                    xs: '100%',  // 100% width on extra-small screens
                    md: '80%',   // 80% width on small screens and up
                },
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    my: '1em'
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, width: '100%' }}>
                        Sold Properties
                    </Typography>
                    <Divider color="black" />
                    <Typography variant="body1" sx={{margin: "1em 0"}}>
                        Properties that have been sold by Louis Wang
                    </Typography>
                </Box>
            </Box>
            
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',  // Centers the content horizontally
                    width: {
                        xs: '100%',  // 100% width on extra-small screens
                        md: '80%',   // 80% width on small screens and up
                    },
                    mx: 'auto',
                    mb: '3em'
                }}
            >
                {listings.map((listing, idx) => (
                    <ListingCard
                        key={idx}
                        address={listing.address}
                        bath={listing.bath}
                        bed={listing.bed}
                        price={listing.price}
                        blurb={listing.blurb}
                        sold={listing.sold}
                        titleImg={listing.titleImg}
                        additionalImg={listing.additionalImg}
                        numImg={listing.numImg}
                        admin={false}
                    />
                ))}
                {listings.length === 0 && <h2>No Listings Found</h2>}
            </Box>
        </Box>
    )
}
export default SoldPage