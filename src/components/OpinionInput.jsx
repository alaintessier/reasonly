import React from 'react';
import { 
  TextField, Box, Paper, Typography, IconButton,
  FactCheckIcon, PsychologyIcon
} from './mui';
import { translations } from '../translations';

const OpinionInput = ({ onSubmitWithMode, opinionText, onOpinionChange, selectedLanguage }) => {
  const handleModeSubmit = (mode) => {
    if (opinionText.trim()) {
      onSubmitWithMode(opinionText, mode, selectedLanguage);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, width: '100%', boxSizing: 'border-box', mt: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {translations[selectedLanguage]?.shareOpinionTitle || translations.English.shareOpinionTitle}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleModeSubmit('challenge')}
            disabled={!opinionText.trim()}
            title={translations[selectedLanguage]?.challengeButton || translations.English.challengeButton}
            sx={{ 
              border: '1px solid', 
              borderColor: 'info.main',
              p: 0.8,
              '&:hover': {
                backgroundColor: 'info.light',
                color: 'info.contrastText'
              }
            }}
          >
            <FactCheckIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleModeSubmit('reinforce')}
            disabled={!opinionText.trim()}
            title={translations[selectedLanguage]?.reinforceButton || translations.English.reinforceButton}
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
            <PsychologyIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        placeholder={translations[selectedLanguage]?.opinionPlaceholder || translations.English.opinionPlaceholder}
        value={opinionText}
        onChange={(e) => onOpinionChange(e.target.value)}
        sx={{ width: '100%', mb: 2 }}
      />
    </Paper>
  );
};

export default OpinionInput;
