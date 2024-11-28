import React from 'react';
import { Box, Typography } from '@mui/material';
import BackToMenu from '../Components/BackToMenu';

const ZZZ = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ textAlign: 'center' }}
    >
      <Typography variant="h4" gutterBottom>Zenless Zone Zero</Typography>
      <BackToMenu />
    </Box>
  );
};

export default ZZZ;