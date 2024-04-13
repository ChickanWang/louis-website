import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import ContactForm from '../Components/ContactForm';

function ContactPage() {

    return (
        <Box sx={{
            backgroundColor: '#E6E8E6',
        }}>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',  // Centers the content horizontally
                    width: {
                        xs: '100%',  // 100% width on extra-small screens
                        md: '80%',   // 80% width on small screens and up
                    },
                    mx: 'auto',  // Centers the box horizontally
                    padding: '6rem',
                }}
            >  
            <Card sx={{
                mx: 'auto',
                padding: '3em',
            }}>
            <h1>Contact Me / Inquire About Booking</h1>
            <Typography variant="body1" paragraph sx={{margin: "1em 0"}}>
                For any inquiries, please fill out this form, I will do my best to get back to you as soon as possible!
            </Typography>
            <ContactForm />
            </Card>
            </Box>
        </Box>
    )
}

export default ContactPage;