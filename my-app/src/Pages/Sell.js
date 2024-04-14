import React from 'react';
import InfoCard from '../Components/InfoCard';
import { Box, Card, Typography, CardMedia } from '@mui/material';
import SellingHome from '../static/pexels/selling-home.jpeg';
import GettingStarted from '../static/pexels/getting-started.jpeg';
import ListingMarketing from '../static/pexels/listing-marketing.jpeg';
import Offers from '../static/pexels/offers.jpeg';
import PostOffer from '../static/pexels/post-offer.jpeg';

const headers = ["Getting Started", "Listing and Marketing", "Dealing with Offers", "Post-Offer Process"]
const content = [
    "Begin your home selling journey by preparing your property and setting the right price. \n" +
    "Our team will guide you through initial assessments and help you understand the market to make your home competitive.",
    "Showcase your home to potential buyers through professional listings and strategic marketing. \n" +
    "Our team will guide you through the process, helping with floor plans, staging advice, and more. \n" +
    "We utilize high-quality photos, virtual tours, and targeted advertising to capture attention and drive showings.",
    "Navigate through the offer process with our expert advice to ensure you make informed decisions. \n" +
    "We help you evaluate each proposal to maximize your sale price and minimize stress and \n" +
    "carefully review all terms and conditions to ensure clarity and include provisions that protect your interests.",
    "Once an offer is accepted, we'll guide you through the necessary inspections, paperwork, and closing procedures. \n" +
    "Our team ensures a smooth transition to finalizing your sale, keeping you informed every step of the way."
]

const images = [GettingStarted, ListingMarketing, Offers, PostOffer]

function SellPage(props) {
    return (        
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E6E8E6',
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
                        src={SellingHome}
                        alt="Selling your Home"
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
                        backgroundColor: '#31493C',
                        color: "white"
                    }}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>Selling your Home</Typography>
                        <hr />
                        <Typography paragraph sx={{
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                        }}>
                           Starting the process of selling your home is both exciting and significant. 
                           Whether you’re a first-time seller or a seasoned investor, my dedicated team and I are ready to assist you every step of the way. 
                           Use our resources, benefit from expert insights, and confidently sell your property with our help.
                        </Typography>
                        <Typography paragraph sx={{
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                        }}>
                            Here are some straightforward steps to follow when buying a home with my guidance.
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
                <InfoCard header={headers[3]} content={content[3]} right={true} img={images[3]} />
            </Box>
        </Box>
    )
}
export default SellPage;