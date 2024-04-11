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
import { styled } from '@mui/system';
import AdminFormPage from './Pages/AdminForm';

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

const AppDiv = styled('div')({
  height: '200vh'
})


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDiv>
        <NavBar />
        <Routes>
          <Route exact path = "/" element = {<Home />} />
          <Route exact path = "/home" element = {<Home />} />
          <Route exact path = "/buy" element = {<Buy />} />
          <Route exact path = "/sell" element = {<Sell />} />
          <Route exact path = "/listings" element = {<Listings />} />
          <Route exact path = "/admin" element = {<Admin />} />
          <Route exact path = "/adminform" element = {<AdminFormPage />} />
        </Routes>
        <Footer sx={{bottom: 0}}/>
      </AppDiv>
      </ThemeProvider>
    </Router>
  );
}

export default App;