import React, { useEffect } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox, Tabs, Tab, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { doc, setDoc, getDocs, collection } from "firebase/firestore"; 
import { auth, db } from '../firebaseConfig';
import TabPanel from '../Components/TabPanel';
import { signOut } from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import ListingCard from '../Components/ListingCard';

const storage = getStorage();

const initialFormData = {
    address: '',
    bath: '',
    bed: '',
    sqft: '',
    price: '',
    desc: '',
    blurb: '',
    numImg : 0,
    sold: false,
};

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64Data = fileReader.result.split(',')[1];
        resolve(base64Data)
      };
      fileReader.onerror = (e) => {
        reject(e);
      };
    });
};

function AdminFormPage(props) {
    const user = auth.currentUser;

    const [selectedTab, setSelectedTab] = useState(0);

    // Add Listings
    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [titleImg, setTitleImg] = useState('');
    const [additionalImg, setAdditionalImg] = useState([]);
    
    // Delete Listings
    const [listings, setListings] = useState([]);

    useEffect(() => { fetchListings(); }, []);

    var img_id = 0

    const fetchListings = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "listings"));
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
          setError(e.message);
        }
    };

    const imageName = () => {
        const res = `${formData.address + "/" + img_id}.jpg`
        img_id += 1
        return res
    }

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleTitleUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setTitleImg(base64);
    };

    const handleAdditionalUpload = async (e) => {
        const files = e.target.files;
        var images = [];
        for (let i = 0; i < files.length; i++) {
            const base64 = await convertToBase64(files[i]);
            images.push(base64);
        }
        setFormData({ ...formData, numImg: images.length });
        setAdditionalImg(images);
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
          window.location.href = "/admin";
        }).catch(() => {
            setError('You are not logged in.');
        });
      };
  
    const handleChange = (e) => {
        var { name, value, checked, type } = e.target;
        if (name === 'desc' || name === 'blurb') {
            value = value.replace(/↵/g, "\n")
        } 
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                setInfo("Adding Listing...")
                await setDoc(doc(db, "listings", formData.address), {
                    address: formData.address,
                    bath: formData.bath,
                    bed: formData.bed,
                    sqft: formData.sqft,
                    price: formData.price,
                    blurb: formData.blurb,
                    desc: formData.desc,
                    numImg: formData.numImg,
                    sold: formData.sold
                });

                const imageRef = ref(storage, imageName());
                const titleUploadPromise = uploadString(imageRef, titleImg, 'base64')
                const uploadPromises = additionalImg.map((img) => {
                    const imageRef = ref(storage, imageName());
                    return uploadString(imageRef, img, 'base64');
                });

                await Promise.all([titleUploadPromise, ...uploadPromises]);
                setFormData(initialFormData);
                setTitleImg('');
                setAdditionalImg([]);
                document.getElementById("headerImg").value = "";
                document.getElementById("otherImg").value = "";
                setInfo('');
                setSuccess('Listing Added Successfully!');
                fetchListings();
            }
            catch (e) {
                setError(e.message);
            };
        } else {
            setError('You are not logged in. Please log in at /admin to submit a property.');
        }
    }

    return (
    <Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2rem'
            }}
        >
            <h1>Manage Your Listings</h1>
            <Button onClick={handleSignOut} variant="contained" color="primary">Sign Out</Button>
        </Box>
        <Tabs 
            value={selectedTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            centered
            textColor="primary"
        >
            <Tab label="Create Properties" />
            <Tab label="Delete Properties" />
        </Tabs>
        {success && <Alert>{success}</Alert>}
        {info && <Alert severity="info">{info}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TabPanel value={selectedTab} index={0}>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: 'auto'
                    }}>
                        <TextField
                            label="Home Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Number of Bathrooms"
                            name="bath"
                            value={formData.bath}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Number of Bedrooms"
                            name="bed"
                            value={formData.bed}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Square Footage"
                            name="sqft"
                            value={formData.sqft}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Blurb"
                            name="blurb"
                            value={formData.blurb}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Description"
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Box 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: 'auto'
                            }}
                        >
                            <h4>Header Image</h4>
                            <input
                                id="headerImg"
                                type="file"
                                label="Title Image"
                                name="titleImg"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => handleTitleUpload(e)}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 'auto'
                        }}>
                            <h4>Other Images</h4>
                            <input 
                                id="otherImg"
                                type="file" 
                                label="Additional Image URLs"
                                name="additionalImg"
                                fullWidth
                                margin="normal"
                                multiple
                                onChange={(e) => handleAdditionalUpload(e)}
                            />
                        </Box>
                        <FormGroup 
                            sx={{margin: '1rem 0'}}
                        >
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={formData.sold}
                                    onChange={handleChange}
                                    name="sold"
                                />
                                }
                                label="Has House Been Sold?"
                            />
                        </FormGroup>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',  // Centers the content horizontally
                    width: {
                        xs: '100%',  // 100% width on extra-small screens
                        md: '80%',   // 80% width on small screens and up
                    },
                    margin: 'auto',  // Centers the box horizontally
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
                        admin={true}
                        fetchListings={fetchListings}
                        setSuccess={setSuccess}
                        setInfo={setInfo}
                        setError={setError}
                    />
                ))}
                {listings.length === 0 && <h2>No Listings Found</h2>}
            </Box>
        </TabPanel>
    </Box>
    );
}

export default AdminFormPage