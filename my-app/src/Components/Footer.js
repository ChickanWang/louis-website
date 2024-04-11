import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WechatIcon from '@mui/icons-material/Chat'; // There's no specific WeChat icon in MUI, using Chat as a placeholder
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', padding: '20px 0', bottom: 0 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/path/to/logo.png" alt="Logo" style={{ marginRight: 10 }} />
            <Typography variant="body1">&copy; {new Date().getFullYear()} Your Company</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/faq" sx={{ marginRight: 2 }}>FAQ</Link>
            <IconButton href="/wechat" sx={{ color: 'inherit', marginRight: 1 }}>
              <WechatIcon />
            </IconButton>
            <IconButton href="https://www.facebook.com" sx={{ color: 'inherit', marginRight: 1 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="tel:+1234567890" sx={{ color: 'inherit', marginRight: 2 }}>
              <PhoneIcon />
            </IconButton>
            <Link href="/buy" sx={{ marginRight: 2 }}>Buy</Link>
            <Link href="/sell" sx={{ marginRight: 2 }}>Sell</Link>
            <Link href="/contact">Contact Me</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
