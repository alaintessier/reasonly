import React from 'react';
import { TextField, Button, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from './mui';
import { translations } from '../translations'; // Import translations

const OpinionInput = ({ onSubmitWithMode, opinionText, onOpinionChange, selectedLanguage, onLanguageChange }) => {
  const handleModeSubmit = (mode) => {
    if (opinionText.trim()) {
      onSubmitWithMode(opinionText, mode, selectedLanguage);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {translations[selectedLanguage]?.shareOpinionTitle || translations.English.shareOpinionTitle}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder={translations[selectedLanguage]?.opinionPlaceholder || translations.English.opinionPlaceholder}
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
          {translations[selectedLanguage]?.challengeButton || translations.English.challengeButton}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleModeSubmit('reinforce')}
          disabled={!opinionText.trim()}
        >
          {translations[selectedLanguage]?.reinforceButton || translations.English.reinforceButton}
        </Button>
      </Box>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel id="language-select-label">{translations[selectedLanguage]?.languageLabel || translations.English.languageLabel}</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          label="Language"
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="French">Français</MenuItem>
          <MenuItem value="Spanish">Español</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default OpinionInput;
