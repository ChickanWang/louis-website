import React from 'react';
import { Box } from '@mui/material';
import suburbBg from '../static/pexels/background.jpeg';

function Test() {
   return( <Box 
    sx={{ 
        height: '700px', 
        width: '100px',
        alignItems: 'center', 
        flexDirection: 'column',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '700px', 
            width: '100px',
            backgroundImage: `url(${suburbBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: 0.7,
            zIndex: -1,
            },
    }}>
    </Box>)
}

export default Test;