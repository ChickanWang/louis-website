import React, { useState } from 'react';
import { Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const initialFormData = {
    name: '',
    phone: '',
    email: '',
    message: '',
};

function ContactPage() {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '2rem'
                }}
            >
                <h1>Contact Me / Inquire About Booking</h1>
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
                    margin: 'auto',  // Centers the box horizontally
                    padding: '2rem',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={formData.messagee}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default ContactPage;