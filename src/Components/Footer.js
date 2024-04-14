import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomelifeLogo from '../static/homelife-logo-sml.png';
import ImageModal from './ImageModal';
import WechatQR from '../static/wechat.jpeg';

function Footer() {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#778DA9', padding: '20px 0', bottom: 0 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={HomelifeLogo} alt="Logo" style={{ width: "80px", height: "80px", marginRight: 10 }} />
            <Typography variant="body1">Copyright &copy; Louis Wang {new Date().getFullYear()}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton href="mailto:wanglizhi2008@gmail.com" sx={{ color: 'inherit', marginRight: 1 }}>
              <EmailIcon />
            </IconButton>
            <ImageModal src={WechatQR} alt="My Wechat QR Code" />
            <IconButton href="tel:+16472984645" sx={{ color: 'inherit', marginRight: 2 }}>
              <PhoneIcon />
            </IconButton>
            <Link href="/buy" sx={{ marginRight: 2 }}>Buy</Link>
            <Link href="/sell" sx={{ marginRight: 2 }}>Sell</Link>
            <Link href="/contact">Contact</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
