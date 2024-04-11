import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import agentPicture from '../static/placeholder.png';
import suburbBg from '../static/background.jpeg';

const StyledCard = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    padding: '2rem',
    height: '70%',
    width: '80%',
    color: 'black',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // 100% transparent
    fontFamily: '"Overpass", sans-serif',
  });

function Homepage(props) {
  return (
    <Box sx={{ minHeight: 'calc(200vh - 14rem)' }}>
        <Box 
            sx={{ 
                height: 'calc(100vh - 7rem)', 
                display: 'flex', 
                alignItems: 'center', 
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${suburbBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    opacity: 0.7,
                    zIndex: -1,
                  },
            }}
        >
                <Grid container sx={{ height:'100%', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h1" sx={{ fontWeight: 900 }}>
                                LOUIS WANG
                                </Typography>
                                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                                Your Trusted Partner for{' '}
                                <span style={{ color: 'olive' }}>GTA</span>{' '}
                                Real Estate Excellence
                                </Typography>
                                <br/>
                                <Typography variant="body1">
                                As a seasoned realtor with extensive experience in the vibrant market of the Greater Toronto Area, 
                                I am dedicated to helping you navigate the complexities of buying, selling, or investing in properties 
                                throughout our diverse community.
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item md={6} sx={{ display: { xs: 'none', md: 'flex' } }} >
                        <Box
                            component="img"
                            sx={{
                                margin: 'auto',
                                bottom: 0,
                                height: 700,
                                width: 470,
                                maxHeight: { xs: 530, md: 790 },
                                maxWidth: { xs: 350, md: 525 },
                            }}
                            alt="Louis Wang - GTA Real Estate Agent"
                            src={agentPicture}
                        />
                    </Grid>
                </Grid>
        </Box>

        <Box sx={{ minHeight: 'calc(100vh - 7rem)' }}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h5">My Skills</Typography>
                    <Typography variant="body1">
                    Here are some of the skills I've acquired over the years:
                    - Skill 1
                    - Skill 2
                    - Skill 3
                    </Typography>
                </CardContent>
                </StyledCard>

                <StyledCard>
                <CardContent>
                    <Typography variant="h5">Contact Me</Typography>
                    <Typography variant="body1">
                    Feel free to reach out via email at [Your Email] or follow me on [Social Media Platform].
                    </Typography>
                </CardContent>
            </StyledCard>
        </Box>
    </Box>
  );
};

export default Homepage