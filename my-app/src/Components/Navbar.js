import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import {Link} from 'react-router-dom';
import Logo from '../static/homelife-logo.png';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';

const navItems = ['Home', 'Buy', 'Sell', 'Sold', 'Listings'];

const StyledNavBar = styled(AppBar)({
    height: '7rem',
    position: 'sticky',
    top: 0,
})

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto 0',
})

function NavBar() {
    return (
      <StyledNavBar>
        <StyledToolbar>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Link to="/home" className="nav-link">
              <Box
                  component="img"
                  sx={{
                      margin: 'auto',
                      bottom: 0,
                      height: 75,
                      width: 170,
                      display: { xs: 'none', sm: 'block' }
                  }}
                  alt="HomeLife Logo"
                  src={Logo}
              />
            </Link>
            <Box sx={{ ml: "1rem", mt: "0.5rem"}}
            >
              <Typography
                variant="h4"
                component="div"
              >
                Louis Wang
              </Typography>
              <Typography>
                Real Estate Broker
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>

            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '0.5rem 0',
            }}>
              <IconButton href="tel:+6472984645" sx={{ color: 'inherit' }}>
                <PhoneIcon sx={{width: '15px', height: '15px'}}/>
              </IconButton>
              <Typography sx={{ mr: "0.2rem", fontSize: '15px', fontWeight: 400, borderRight: '0.1em solid white', padding: '0.5em' }}>647-298-4645</Typography>
              <IconButton href="mailto:wanglizhi2008@gmail.com" sx={{ color: 'inherit' }}>
                <EmailIcon sx={{width: '15px', height: '15px'}}/>
              </IconButton>
              <Typography sx={{ ml: "0.2rem", mr: "0.5rem", fontSize: '15px', fontWeight: 400}}>wanglizhi2008@gmail.com</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: '#fff' }}>
                    <Link to={`/${item.toLowerCase()}`} className="nav-link">
                        {item}
                    </Link>
                  </Button>
                ))}
                <Button
                    sx={{
                    fontWeight: 300,
                    borderRadius: '15px',
                    backgroundColor: 'olive',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'black',
                    },
                    ml: '1rem',
                    mr: '0.5rem' 
                    }}
                    padding="0.5rem"
                    href="/contact"
                >
                    Contact Me
              </Button>
            </Box>
          </Box>
        </StyledToolbar>
      </StyledNavBar>
    )
}

export default NavBar