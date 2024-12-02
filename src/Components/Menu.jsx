import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const Menu = () => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={1.5}
      >
        <Typography variant="h3" gutterBottom>
          Gacha Manager
        </Typography>

        <Button 
          component={Link} 
          to="/gi" 
          variant="contained" 
          fullWidth 
          sx={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/Gacha-Manager/gi.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '80px', 
            fontWeight: 'bold', 
            fontSize: '1.2rem', 
            color: '#e0e0e0',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Genshin Impact
        </Button>
        <Button 
          component={Link} 
          to="/hsr" 
          variant="contained" 
          fullWidth 
          sx={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/Gacha-Manager/hsr.webp)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '80px', 
            fontWeight: 'bold', 
            fontSize: '1.2rem', 
            color: '#e0e0e0',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Honkai Star Rail
        </Button>
        <Button 
          component={Link} 
          to="/zzz" 
          variant="contained" 
          fullWidth 
          sx={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/Gacha-Manager/zzz.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '80px', 
            fontWeight: 'bold', 
            fontSize: '1.2rem', 
            color: '#e0e0e0',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Zenless Zone Zero
        </Button>
        <Button 
          component={Link} 
          to="/wuwa" 
          variant="contained" 
          fullWidth 
          sx={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/Gacha-Manager/wuwa.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '80px', 
            fontWeight: 'bold', 
            fontSize: '1.2rem', 
            color: '#e0e0e0',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Wuthering Waves
        </Button>
      </Box>
    </Container>
  );
};

export default Menu;
