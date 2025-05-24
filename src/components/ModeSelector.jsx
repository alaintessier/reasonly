import React from 'react';
// Import from our barrel file to avoid casing issues
import { Box, Button, Paper, Typography, AutorenewIcon, BalanceIcon, SearchIcon } from './mui';

const ModeSelector = ({ onSelect }) => {
  const modes = [
    {
      id: 'reinforce',
      title: 'Reinforce Me',
      icon: <AutorenewIcon />,
      description: 'Get supporting arguments for your view',
      color: '#4caf50'
    },
    {
      id: 'challenge',
      title: 'Challenge Me',
      icon: <BalanceIcon />,
      description: 'Explore counterpoints to your perspective',
      color: '#f44336'
    },
    {
      id: 'split',
      title: 'Split View',
      icon: <SearchIcon />,
      description: 'See both sides of the argument',
      color: '#2196f3'
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Choose Your Mode
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {modes.map((mode) => (
          <Button
            key={mode.id}
            variant="contained"
            startIcon={mode.icon}
            onClick={() => onSelect(mode.id)}
            sx={{
              backgroundColor: mode.color,
              '&:hover': {
                backgroundColor: mode.color,
                opacity: 0.9
              },
              py: 2
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="subtitle1">{mode.title}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {mode.description}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default ModeSelector;
