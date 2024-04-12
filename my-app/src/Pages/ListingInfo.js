import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';

function ListingInfo(props) {
    const { address } = useParams();
    const [listing, setListing] = useState({});
    const storage = getStorage();

    const fetchListing = async () => {
        console.log("fetching ...")
        try {
          const querySnapshot = await getDocs(query(collection(db, "listings"), where("address", "==", address)));
          const listing = querySnapshot.docs.map(doc => doc.data())[0];
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
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchListing();
    }, []);
    const f = () => {
        console.log("piss")
        console.log(listing)
    }
    return (
        <div>
            Listing Info
            <Box>
                <Button onClick={() => f()}></Button>
                <Typography variant="h4">
                    {listing.address}
                    {listing.price}
                    {listing.bed}
                    {listing.bath}
                </Typography>
            </Box>
        </div>
    )
}
export default ListingInfo;