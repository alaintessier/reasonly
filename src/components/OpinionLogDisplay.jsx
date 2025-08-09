import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from './mui';
import { translations } from '../translations'; // Import translations

function OpinionLogDisplay({ opinionLog, onLogEntrySelect, selectedLanguage }) {
  const currentTranslations = translations[selectedLanguage] || translations.English;

  if (!opinionLog || opinionLog.length === 0) {
    return (
      <Typography variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
        {currentTranslations.noRecentOpinions}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {currentTranslations.recentOpinionsTitle}
      </Typography>
      <Paper elevation={2} sx={{ maxHeight: 300, overflow: 'auto' }}>
        <List dense>
          {opinionLog.map((entry) => (
            <ListItem 
              key={entry.id} 
              divider 
              button // Makes the ListItem appear clickable
              onClick={() => onLogEntrySelect(entry.text)}
            >
              <ListItemText
                primary={entry.text}
                secondary={`${currentTranslations.loggedAt}: ${new Date(entry.timestamp).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default OpinionLogDisplay;
