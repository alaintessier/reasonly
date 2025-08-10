import React from 'react';
// Import from our barrel file to avoid casing issues
import { Paper, Typography, Box, CircularProgress, Button, IconButton } from './mui';
import { ThumbUpIcon, ThumbDownIcon, ArrowBackIcon } from './mui';
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
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 3, position: 'relative', width: '100%', mt: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {currentTranslations.analysisTitle}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton 
            size="small" 
            color="primary" 
            onClick={() => onReaction('positive')}
            title={currentTranslations.helpfulButton}
            sx={{ 
              border: '1px solid', 
              borderColor: 'primary.main', 
              p: 0.8,
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText'
              } 
            }}
          >
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => onReaction('negative')}
            title={currentTranslations.weakButton}
            sx={{ 
              border: '1px solid', 
              borderColor: 'error.main', 
              p: 0.8,
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.contrastText'
              }
            }}
          >
            <ThumbDownIcon fontSize="small" />
          </IconButton>
          
          <IconButton 
            size="small" 
            color="info"
            onClick={onStartNewOpinion}
            title={currentTranslations.backButton || "Back"}
            sx={{ 
              ml: 1, 
              border: '1px solid', 
              borderColor: 'info.main', 
              p: 0.8,
              '&:hover': {
                backgroundColor: 'info.light',
                color: 'info.contrastText'
              } 
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>
        {response}
      </Typography>
      
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'text.secondary' }}>
        {currentTranslations.reactionPrompt}
      </Typography>
    </Paper>
  );
};

export default ResponseDisplay;
