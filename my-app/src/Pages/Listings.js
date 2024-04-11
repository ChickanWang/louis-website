import React from 'react';
import ListingCard from '../Components/ListingCard';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';


function Listingspage(props) {
    const [listings, setListings] = useState([]);
    const storage = getStorage();

    const fetchListings = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "listings"));
          const listingsArray = querySnapshot.docs.map(doc => doc.data());
          var imageArray = [];
          var additionalArray = [];

          for (let i = 0; i < listingsArray.length; i++) {
              var temp = []
              for (let j = 0; j <= listingsArray[i].numImg; j++) {
                  const url = await getDownloadURL(ref(storage, `${listingsArray[i].address}/${j}.jpg`));
                  if (j === 0) {
                      imageArray.push(url);
                  } else {
                      temp.push(url);
                  }
              }
              additionalArray.push(temp);
          }

          const zipped = listingsArray.map((item, index) => ({
              ...item,
              titleImg: imageArray[index],
              additionalImg: additionalArray[index]
          }));

          setListings(zipped);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => { fetchListings(); });

    return (
        <div>
            {listings.map((listing, idx) => (
                <ListingCard
                    key={idx}
                    address={listing.address}
                    bath={listing.bath}
                    bed={listing.bed}
                    sqft={listing.sqft}
                    blurb={listing.blurb}
                    sold={listing.sold}
                    titleImg={listing.titleImg}
                    additionalImg={listing.additionalImg}
                    numImg={listing.numImg}
                    admin={false}
                />
            ))}
            {listings.length === 0 && <h2>No Listings Found</h2>}
        </div>
    )
}
export default Listingspage