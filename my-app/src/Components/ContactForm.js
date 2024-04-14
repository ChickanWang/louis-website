import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';

const initialFormData = {
    name: '',
    phone: '',
    email: '',
    message: '',
};

const FORM_ENDPOINT = "https://public.herotofu.com/v1/67d03640-f9cb-11ee-bf9d-5f9a26e8739d"

function ContactForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const inputs = e.target.elements;
        const data = {};
    
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].name) {
            data[inputs[i].name] = inputs[i].value;
          }
        }
    
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Form response was not ok');
            }
            setFormData(initialFormData);
            setSuccess('Thanks for Reaching Out! We will get back to you soon!');
          })
          .catch((err) => {
            e.target.submit();
          });
      };

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',  // Centers the content horizontally
                width: '100%',
                mx: 'auto',
            }}
        >
            {success && <Alert>{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    size="small"
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        size="small"
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        size="small"
                    />
                </Box>
                <TextField
                    label="Message"
                    name="message"
                    value={formData.messagee}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    required
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default ContactForm;