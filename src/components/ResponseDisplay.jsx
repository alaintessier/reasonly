import React from 'react';
// Import from our barrel file to avoid casing issues
import { Paper, Typography, Box, CircularProgress, Button, IconButton } from './mui';
import { ThumbUpIcon, ThumbDownIcon } from './mui';
import { translations } from '../translations';

const ResponseDisplay = ({ loading, response, onReaction, onStartNewOpinion, selectedLanguage }) => {
  const currentTranslations = translations[selectedLanguage] || translations.English;
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>{currentTranslations.loadingAnalysis}</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {currentTranslations.analysisTitle}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
        {response}
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="caption" display="block" gutterBottom>
            {currentTranslations.reactionPrompt}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ThumbUpIcon />}
              onClick={() => onReaction('positive')}
            >
              {currentTranslations.helpfulButton}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ThumbDownIcon />}
              onClick={() => onReaction('negative')}
            >
              {currentTranslations.weakButton}
            </Button>
          </Box>
        </Box>
        <Button variant="outlined" onClick={onStartNewOpinion} sx={{ ml: 'auto' }}>
          {currentTranslations.startNewOpinionButton}
        </Button>
      </Box>
    </Paper>
  );
};

export default ResponseDisplay;
