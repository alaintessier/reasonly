import React from 'react';
// Import from our barrel file to avoid casing issues
import { TextField, Button, Box, Paper, Typography } from './mui';

const OpinionInput = ({ onSubmitWithMode, opinionText, onOpinionChange }) => {
  const handleModeSubmit = (mode) => {
    if (opinionText.trim()) {
      onSubmitWithMode(opinionText, mode);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Share Your Opinion
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="What's your opinion on this topic?"
        value={opinionText}
        onChange={(e) => onOpinionChange(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handleModeSubmit('challenge')}
          disabled={!opinionText.trim()}
        >
          Challenge Me
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleModeSubmit('reinforce')}
          disabled={!opinionText.trim()}
        >
          Reinforce Me
        </Button>
      </Box>
    </Paper>
  );
};

export default OpinionInput;
