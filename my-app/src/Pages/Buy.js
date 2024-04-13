import React from 'react';
import InfoCard from '../Components/InfoCard';
import { Box, Card, CardContent, Typography, CardMedia } from '@mui/material';
import BuyingHome from '../static/pexels/buying-home.jpeg';
import Consultation from '../static/pexels/consultation.jpeg';
import HomeSearch from '../static/home-search.jpeg';
import PropertyViewings from '../static/pexels/property-viewings.jpeg';

const headers = ["Consultation", "Home Search", "Property Viewings"]
const content = [
    "Schedule a free consultation to discuss your home buying criteria, budget, and timeline. \
    We'll help you understand the market and outline what you can expect throughout the buying process.",
    "I leverage my extensive experience and network to select properties that align perfectly with your lifestyle and budget.\
     With access to all of the GTA Real Estate Board and insights into properties that aren't widely advertised,\
     you're not just finding a house; you're finding your future home.",
    "Once we've narrowed down the list to a few select properties, the next step is for us to visit these homes in person.\
     If one of them turns out to be everything you’ve hoped for, we’ll move forward by making an offer."
]
const images = [Consultation, HomeSearch, PropertyViewings]

function Buypage(props) {
    return (        
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E6E8E6'
        }}>
            <Card sx={{
                width: '100%',
                mx: 'auto',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <CardMedia 
                        component="img"
                        src={BuyingHome}
                        alt="Buying a Home"
                        sx={{
                        width: '100%',
                        height: 600,
                        objectFit: 'cover',
                    }} />
                    <Box sx={{
                        py: '5em',
                        px: {
                            xs: '1rem',  // 100% width on extra-small screens
                            md: '5rem',   // 80% width on small screens and up
                        },
                        backgroundColor: '#0B4F6C',
                        color: "white"
                    }}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>Buying a Home</Typography>
                        <hr />
                        <Typography paragraph sx={{
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                        }}>
                            Embarking on the journey to buy a home can be as thrilling as it is daunting.
                            Whether you're a first-time buyer or an experienced investor, my dedicated team is here
                            to guide you every step of the way. Explore our resources, get expert advice, and find your perfect home with us.
                        </Typography>
                        <Typography paragraph sx={{
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                        }}>
                            As an experienced real estate broker, I offer reliable information, exceptional service, and above all, honest advice.
                            I'm committed to helping you find the home that’s perfect for you.
                        </Typography>
                        <Typography paragraph sx={{
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                        }}>
                            Here are some simple steps to follow when buying a home with my guidance.
                        </Typography>
                    </Box>
                </Box>
            </Card>
            <Box  
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',  // Centers the content horizontally
                    width: {
                        xs: '90%',  // 100% width on extra-small screens
                        md: '70%',   // 80% width on small screens and up
                    },
                    mx: 'auto',
                    mb: '3em'
                }}
            >
                <InfoCard header={headers[0]} content={content[0]} right={false} img={images[0]} />
                <InfoCard header={headers[1]} content={content[1]} right={true} img={images[1]} />
                <InfoCard header={headers[2]} content={content[2]} right={false} img={images[2]} />
            </Box>
        </Box>
    )
}
export default Buypage