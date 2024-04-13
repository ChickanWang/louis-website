import './App.css';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Components/Navbar';
import Home from './Pages/Home';
import Buy from './Pages/Buy';
import Sell from './Pages/Sell';
import Listings from './Pages/Listings';
import Admin from './Pages/LoginPage';
import Footer from './Components/Footer';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import AdminFormPage from './Pages/AdminForm';
import SoldPage from './Pages/Sold';
import ContactPage from './Pages/Contact';
import ListingInfo from './Pages/ListingInfo';
import { Box } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: "#012a6b"
    }
  },
  typography: {
    fontFamily: '"Overpass", sans-serif',
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <Router>
      <Box sx={{minHeight: '100vh'}}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route exact path = "/" element = {<Home />} />
        <Route exact path = "/home" element = {<Home />} />
        <Route exact path = "/buy" element = {<Buy />} />
        <Route exact path = "/sell" element = {<Sell />} />
        <Route exact path = "/listings" element = {<Listings />} />
        <Route exact path = "/admin" element = {<Admin />} />
        <Route exact path = "/adminform" element = {<AdminFormPage />} />
        <Route exact path = "/sold" element = {<SoldPage />} />
        <Route exact path = "/contact" element = {<ContactPage />} />
        <Route exact path = "/listinginfo/:address/*" element={<ListingInfo /> } />
      </Routes>
      <Footer sx={{bottom: 0}}/>
      </ThemeProvider>
      </Box>
    </Router>
  );
}

export default App;