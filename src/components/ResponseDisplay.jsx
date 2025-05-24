import React from 'react';
// Import from our barrel file to avoid casing issues
import { Paper, Typography, Box, CircularProgress, Button, ThumbUpIcon, ThumbDownIcon } from './mui';

const ResponseDisplay = ({ loading, response, onReaction, onStartNewOpinion }) => {
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Analysis
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>
        {response}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ThumbUpIcon />}
          onClick={() => onReaction('positive')}
        >
          This was helpful
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ThumbDownIcon />}
          onClick={() => onReaction('negative')}
        >
          This was weak
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" onClick={onStartNewOpinion}>
          Enter New Opinion
        </Button>
      </Box>
    </Paper>
  );
};

export default ResponseDisplay;
