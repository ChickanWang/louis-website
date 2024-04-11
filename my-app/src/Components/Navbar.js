import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import {Link} from 'react-router-dom';

const navItems = ['Home', 'Buy', 'Sell', 'Listings'];

const StyledNavBar = styled(AppBar)({
    height: '7rem',
    position: 'sticky',
    top: 0,
})

const StyledToolbar = styled(Toolbar)({
    margin: 'auto 0',
})

function NavBar() {
    return (
      <StyledNavBar>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Louis Wang
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
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
                padding: '10px 6px 6px 6px',
                '&:hover': {
                    backgroundColor: 'black',
                },
                margin: '2px',
                }}
            >
                Contact Me!
          </Button>
          </Box>
        </StyledToolbar>
      </StyledNavBar>
    )
}

export default NavBar