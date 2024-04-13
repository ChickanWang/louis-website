import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import ContactForm from '../Components/ContactForm';
import ImageModal from "../Components/ImageModal";

function ListingInfo(props) {
    var { address } = useParams();
    address = decodeURIComponent(address);
    const [listing, setListing] = useState({});
    const storage = getStorage();

    const fetchListing = async () => {
        try {
          const querySnapshot = await getDocs(query(collection(db, "listings"), where("address", "==", address)));
          console.log(address);
          const listing = querySnapshot.docs.map(doc => doc.data())[0];
          console.log(listing);
          var titleImg = "";
          var additionalImg = [];

            for (let j = 0; j <= listing.numImg; j++) {
                const url = await getDownloadURL(ref(storage, `${listing.address}/${j}.jpg`));
                if (j === 0) {
                    titleImg = url;
                } else {
                    additionalImg.push(url);
                }
            }

          const zipped = {
              ...listing,
              titleImg: titleImg,
              additionalImg: additionalImg
          };

          setListing(zipped);
          console.log(listing);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchListing();
    }, []);
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#E6E8E6'
        }}>
            <Card sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    lg: 'row',
                },
                alignItems: 'center',
                width: {
                    xs: '100%',
                    md: '80%',
                },
                mx: 'auto',
                my: '2em',
            }}>
                <CardMedia 
                    component="img"
                    src={listing.titleImg}
                    alt="Listing"
                    sx={{
                        width: 600,
                        height: 500,
                        objectFit: 'cover',
                        margin: '1em',
                        borderRadius: '1em',
                    }}
                />
                <Box sx={{
                    padding: '1em'
                }}
                >
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                        {listing.address}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                        $ {listing.price}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 500,
                                mr: '1em',
                                borderRight: '0.1em solid black',
                                py: '0.5em',
                                pr: '1em'
                            }}
                        >
                            <HotelIcon sx={{mr: '8px'}} />
                            {listing.bed} Bedrooms
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 500,
                                mr: '1em',
                                borderRight: '0.1em solid black',
                                py: '0.5em',
                                pr: '1em'
                            }}
                        >
                            <BathtubIcon sx={{mr: '8px'}} />
                            {listing.bath} Bathrooms
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 500,
                                mr: '1em',
                                py: '0.5em',
                            }}
                        >
                            <SquareFootIcon sx={{mr: '8px'}} />
                            {listing.sqft} sqft
                        </Typography>
                    </Box>
                    <Box sx={{
                        padding: '0.5em',
                        my: '1em',
                    }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
                            Inquiries / Schedule a Visit
                        </ Typography>
                        <hr/>
                        <ContactForm />
                    </Box>
                </Box>
            </Card>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: {
                    xs: '100%',
                    md: '80%',
                },
                mx: 'auto',
                my: '2em',
                padding: '1em',
            }}
            >
                <Typography variant="h3">
                    Details
                </Typography>
                <hr/>
                <Typography sx={{ 
                    whiteSpace: 'pre-line',
                    padding: '1em',
                }}>
                    {listing.desc}
                </Typography>
                {listing.additionalImg && 
                <Box sx={{
                    my: '2em',
                    padding: '1em',
                }}>
                    <Typography variant="h5">
                        Additional Images
                    </Typography>
                    <hr/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}>
                        {listing.additionalImg.map((img, index) => (
                            <ImageModal 
                                sx={{
                                    margin: '5em',
                                }}
                                key={index}
                                src={img} 
                                alt={listing.address} />
                        ))}
                    </Box>
                </Box>}
            </Card>
        </Box>
    )
}
export default ListingInfo;