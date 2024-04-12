import React, {useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ListingCard from '../Components/ListingCard';
import agentPicture from '../static/louis-wang.png';
import suburbBg from '../static/background.jpeg';
import HouseIcon from '@mui/icons-material/House';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Button from '@mui/material/Button';

const StyledCard = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    padding: '2rem',
    height: '70%',
    width: '80%',
    color: 'black',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // 100% transparent
    fontFamily: '"Overpass", sans-serif',
  });

function Homepage(props) {
    const [listings, setListings] = useState([]);
    const storage = getStorage();

    useEffect(() => { fetchListings(); }, []);

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

          setListings(zipped.slice(0, 3));
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
    <Box sx={{ minHeight: 'calc(200vh - 14rem)' }}>
        <Box 
            sx={{ 
                height: 'calc(100vh - 7rem)', 
                display: 'flex', 
                alignItems: 'center', 
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${suburbBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    opacity: 0.7,
                    zIndex: -1,
                    },
            }}
        >
                <Grid container sx={{ height:'100%', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                                LOUIS WANG
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                                    Real Estate Broker
                                </Typography>
                                <hr/>
                                <Typography variant="h3" sx={{ fontWeight: 500 }}>
                                Your Trusted Partner for{' '}
                                <span style={{ color: 'olive' }}>GTA</span>{' '}
                                Real Estate Excellence
                                </Typography>
                                <br/>
                                <Typography variant="body1">
                                As a seasoned realtor with extensive experience in the vibrant market of the Greater Toronto Area, 
                                I am dedicated to helping you navigate the complexities of buying, selling, or investing in properties 
                                throughout our diverse community.
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item md={6} sx={{ display: { xs: 'none', md: 'flex' } }} >
                        <Box
                            component="img"
                            sx={{
                                margin: 'auto',
                                bottom: 0,
                                height: 700,
                                width: 470,
                                maxHeight: { xs: 530, md: 790 },
                                maxWidth: { xs: 350, md: 525 }, 
                            }}
                            alt="Louis Wang - GTA Real Estate Agent"
                            src={agentPicture}
                        />
                    </Grid>
                </Grid>
        </Box>

        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 7rem)',
            backgroundColor: '#F8F4E3',
            px: '10em',
            py: '2em',
        }}>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem',
                border: '1px solid #ccc', 
                borderRadius: '8px',
                pt: '1em',
                px: '1em'
            }}>
                <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 0 }}>Get to Know Me</Typography>
                    <hr/>

                    <Typography paragraph>
                        With over 10 years of experience in the real estate industry, I have a profound understanding of the market trends and a knack for finding the best deals.
                    </Typography>
                    <Typography paragraph>
                        I specialize in residential properties, focusing on both buyers and sellers. I'm committed to delivering the best results and ensuring a smooth transaction process.
                    </Typography>
                    <Typography paragraph>
                        I'm passionate about helping people find their dream homes and invest wisely in real estate. My approach is client-focused, ensuring that each client receives personalized and professional service.
                    </Typography>
                    <Typography paragraph>
                        When I'm not working, I enjoy hiking, photography, and spending time with my family.
                    </Typography>

                    <hr />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>Contact Me</Typography>
                            <Typography paragraph>
                                647-298-4645 <br/>
                                wanglizhi2008@gmail.com <br/>
                            </Typography>
                            <Button sx={{my: '1rem'}} variant="contained" color="primary">Book a Showing</Button>
                        </Box>

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 600 }} align="right">Brokerage</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>HomeLife Landmark Realty Inc., Brokerage</Typography>
                            <Typography paragraph align="right">
                                1943 IRONOAK WAY #203 <br/>
                                OAKVILLE, Ontario <br/>
                                L6H3V7
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Box sx={{margin: '1rem'}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: '1em',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <a href="/listings" sx={{color: 'black'}}>
                            <Typography variant="body" sx={{ fontWeight: 200 }}>View All Listings</Typography>
                            <KeyboardDoubleArrowRightIcon sx={{height: '25px', width: '25px'}} />
                        </a>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <a href="/sold" sx={{color: 'black'}}>
                            <Typography variant="body" sx={{ fontWeight: 200 }}>View Sold Listings</Typography>
                            <HouseIcon sx={{height: '25px', width: '25px', mb: '2px'}} />
                        </a>
                    </Box>
                </Box>
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
                {listings.length === 0 && <h2 sx={{margin: '3rem'}}>No Listings Found</h2>}
            </Box>
        </Box>
    </Box>
    );
};

export default Homepage