import { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import axios
// Direct import for createTheme to fix TypeError
import { createTheme } from '@mui/material';
// Other MUI imports from our barrel file
import { ThemeProvider, CssBaseline, Container, Box, IconButton, Paper, Typography, 
  responsiveFontSizes, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from './components/mui';
import { AccountCircleIcon } from './components/mui';
import { translations } from './translations'; // Import translations
import OpinionInput from './components/OpinionInput';
// ModeSelector is no longer needed
import ResponseDisplay from './components/ResponseDisplay';
import OpinionLogDisplay from './components/OpinionLogDisplay'; // Import the new component

// Import the logo
import reasonlyLogo from './assets/reasonly2.png';

import './App.css';




function App() {
  const [step, setStep] = useState('input');
  const [opinion, setOpinion] = useState('');
  const [mode, setMode] = useState(null); // 'reinforce', 'challenge', 'neutral'
  const [language, setLanguage] = useState('English'); // Default language
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  // Profile state variables
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('reasonlyUserName') || '';
    } catch (error) {
      console.error("Failed to load user name from localStorage:", error);
      return '';
    }
  });
  const [userPreferredLanguage, setUserPreferredLanguage] = useState(() => {
    try {
      return localStorage.getItem('reasonlyUserLanguage') || 'English';
    } catch (error) {
      console.error("Failed to load user language preference from localStorage:", error);
      return 'English';
    }
  });
  // API Key state
  const [userApiKey, setUserApiKey] = useState(() => {
    try {
      return localStorage.getItem('reasonlyApiKey') || '';
    } catch (error) {
      console.error('Error reading API key from localStorage:', error);
      return '';
    }
  });

  const [opinionLog, setOpinionLog] = useState(() => {
    try {
      const storedLog = localStorage.getItem('reasonlyOpinionLog');
      return storedLog ? JSON.parse(storedLog) : [];
    } catch (error) {
      console.error("Failed to load opinion log from localStorage on init:", error);
      return [];
    }
  });
  
  // Get translations for the current language
  const currentTranslations = translations[language] || translations.English;

  // Create a modern, responsive theme with a beautiful color palette
  let theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#6C63FF', // Modern purple as primary color
        light: '#9C97FF',
        dark: '#4641B7',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#FF7C7C', // Coral red as secondary color
        light: '#FF9E9E',
        dark: '#E25F5F',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#F8F9FB', // Light gray background
        paper: '#FFFFFF'
      },
      text: {
        primary: '#2A2B3A', // Dark slate for primary text
        secondary: '#5F6177' // Medium slate for secondary text
      },
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
      },
      warning: {
        main: '#FFAE42',
        light: '#FFD591',
        dark: '#E09816',
      },
      error: {
        main: '#FF5252',
        light: '#FF8A8A',
        dark: '#D32F2F',
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.01em'
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em'
      },
      h3: {
        fontWeight: 600
      },
      h4: {
        fontWeight: 600
      },
      h5: {
        fontWeight: 600
      },
      h6: {
        fontWeight: 600
      },
      subtitle1: {
        fontWeight: 500
      },
      subtitle2: {
        fontWeight: 500
      },
      body1: {
        lineHeight: 1.6
      },
      button: {
        fontWeight: 600,
        textTransform: 'none'
      }
    },
    shape: {
      borderRadius: 12 // Rounded corners throughout the app
    },
    shadows: [
      'none',
      '0 2px 4px 0 rgba(0,0,0,0.05)',
      '0 4px 8px 0 rgba(0,0,0,0.07)',
      '0 8px 16px 0 rgba(0,0,0,0.07)',
      '0 12px 24px 0 rgba(0,0,0,0.07)',
      // Keep remaining shadow definitions
      ...Array(20).fill('none').map((_, i) => {
        const intensity = (i + 5) * 0.01;
        return `0 ${i * 2}px ${i * 4}px rgba(0,0,0,${intensity})`;
      })
    ],
    components: {
      // Style overrides for specific MUI components
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 22px',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)'
          },
          contained: {
            '&:hover': {
              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
              transform: 'translateY(-1px)'
            }
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px'
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderWidth: '1px'
              },
              '&:hover fieldset': {
                borderWidth: '2px'
              },
              '&.Mui-focused fieldset': {
                borderWidth: '2px'
              }
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 8px 24px 0 rgba(0,0,0,0.07)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 32px 0 rgba(0,0,0,0.1)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 16px 0 rgba(0,0,0,0.05)'
          }
        }
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: '24px',
            paddingBottom: '24px'
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: '12px'
          }
        }
      }
    }
  });
  
  // Make typography responsive
  theme = responsiveFontSizes(theme);

  // Effect to save opinion log to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('reasonlyOpinionLog', JSON.stringify(opinionLog));
    } catch (error) {
      console.error("Failed to save opinion log to localStorage:", error);
    }
  }, [opinionLog]);

  // Effect to save user profile data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('reasonlyUserName', userName);
    } catch (error) {
      console.error("Failed to save user name to localStorage:", error);
    }
  }, [userName]);

  useEffect(() => {
    try {
      localStorage.setItem('reasonlyUserLanguage', userPreferredLanguage);
      // Also update current language when preferred language changes
      setLanguage(userPreferredLanguage);
    } catch (error) {
      console.error("Failed to save user language preference to localStorage:", error);
    }
  }, [userPreferredLanguage]);

  useEffect(() => {
    try {
      if (userApiKey) {
        localStorage.setItem('reasonlyApiKey', userApiKey);
      }
    } catch (error) {
      console.error("Failed to save API key to localStorage:", error);
    }
  }, [userApiKey]);

  // Function to handle profile dialog
  const handleProfileSave = () => {
    // User preferences are automatically saved via the useEffect hooks
    // Just mark the dialog as closed
    setProfileDialogOpen(false);
  };
  
  const handleProfileCancel = () => {
    setProfileDialogOpen(false);
  };

  // Combined handler for submitting opinion, selected mode, and language
  const handleOpinionAndModeSubmit = async (text, selectedMode, selectedLang) => {
    setOpinion(text); // Set current opinion for processing
    setMode(selectedMode); // Set selected mode
    setStep('response'); // Move directly to response step
    setLoading(true);

    // Add to opinion log
    const newLogEntry = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toISOString(),
    };
    setOpinionLog(prevLog => {
      const updatedLog = [newLogEntry, ...prevLog];
      return updatedLog.slice(0, 10);
    });

    // API Call Logic (moved from former handleModeSelect)
    // First try to use user-provided API key, then fall back to environment variable
    const apiKey = userApiKey || import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not found.');
      setResponse(translations[language]?.apiKeyError || translations.English.apiKeyError);
      setLoading(false);
      setProfileDialogOpen(true); // Open profile dialog to prompt for API key
      return;
    }

    // Map language codes to full language names for clearer AI instructions
    const languageMap = {
      'English': 'English',
      'French': 'French (Français)',
      'Spanish': 'Spanish (Español)'
    };
    const targetLanguage = languageMap[selectedLang] || 'English';
    
    let promptContent = `The user's opinion is: "${text}". IMPORTANT: You must provide your entire response in ${targetLanguage}. Do not use any other language. `;
    if (selectedMode === 'reinforce') {
      promptContent += 'Please provide points that reinforce this opinion and explain why it might be valid.';
    } else if (selectedMode === 'challenge') {
      promptContent += 'Please provide points that challenge this opinion and offer alternative perspectives.';
    } else if (selectedMode === 'neutral') { // Though neutral is not an option from OpinionInput now, keeping for potential future use
      promptContent += 'Please provide a neutral, objective analysis of this opinion, outlining various facets or implications without taking a stance.';
    }

    try {
      const apiClient = axios.create({
        baseURL: 'https://api.openai.com/v1',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const apiResponse = await apiClient.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: `You are a helpful assistant that analyzes user opinions. You must always respond in ${targetLanguage}. Never mix languages in your response.` },
          { role: 'user', content: promptContent }
        ]
      });

      if (apiResponse.data.choices && apiResponse.data.choices.length > 0) {
        setResponse(apiResponse.data.choices[0].message.content);
      } else {
        setResponse(translations[language]?.aiUnexpectedResponse || translations.English.aiUnexpectedResponse);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      if (error.response) {
        setResponse(`Error: ${error.response.data.error?.message || translations[language]?.aiResponseError || translations.English.aiResponseError}`);
      } else if (error.request) {
        setResponse(translations[language]?.aiResponseError || translations.English.aiResponseError);
      } else {
        setResponse(translations[language]?.aiRequestError || translations.English.aiRequestError);
      }
    }
    setLoading(false);
  };


  const handleReaction = (type) => {
    // TODO: Implement reaction handling
    console.log('Reaction:', type);
  };

  const handleStartNewOpinion = () => {
    setStep('input');
    setOpinion('');
    setMode(null);
    setResponse('');
    // setLoading(false); // Not strictly necessary here as we are navigating away
  };

  const handleLogEntrySelect = (selectedOpinionText) => {
    setOpinion(selectedOpinionText);
    setStep('input'); // Go back to the input screen
    setMode(null);    // Clear previous mode
    setResponse('');  // Clear previous response
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        backgroundColor: 'background.default', 
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        pt: 2
      }}>
        {/* Logo Header */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          pb: 0,
          mb: 2,
          width: '100%'
        }}>
          <Box sx={{
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1200px',
            mx: 'auto'
          }}>
            {/* Logo on the left */}
            <Box>
              <img 
                src={reasonlyLogo} 
                alt="Reasonly Logo" 
                style={{ height: '80px', cursor: 'pointer' }} 
                onClick={handleStartNewOpinion}
              />
            </Box>
            
            {/* Profile Button on the right */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* Profile Button */}
              <IconButton 
                color="primary" 
                onClick={() => setProfileDialogOpen(true)}
                title={translations[language]?.profileSettings || "Profile Settings"}
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'primary.main',
                  p: 1.2,
                }}
              >
                <AccountCircleIcon fontSize="medium" />
              </IconButton>
              
              {/* Custom Profile Modal */}
              {profileDialogOpen && (
                <Box
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1300,
                  }}
                  onClick={handleProfileCancel}
                >
                  <Paper
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      p: 3,
                      m: 2,
                      maxHeight: '90vh',
                      overflowY: 'auto'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    elevation={6}
                  >
                    {/* Title */}
                    <Typography variant="h6" component="h2" gutterBottom>
                      {translations[language]?.profileSettings || "Profile Settings"}
                    </Typography>
                    
                    {/* Description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {translations[language]?.profileDescription || "Your profile information will be saved locally on your device."}
                    </Typography>
                    
                    {/* Name Field */}
                    <TextField
                      margin="dense"
                      id="name"
                      label={translations[language]?.firstName || "First Name"}
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    
                    {/* API Key Field */}
                    <TextField
                      margin="dense"
                      id="apiKey"
                      label={translations[language]?.apiKeyLabel || "OpenAI API Key"}
                      type="password"
                      fullWidth
                      variant="outlined"
                      value={userApiKey}
                      onChange={(e) => setUserApiKey(e.target.value)}
                      helperText={translations[language]?.apiKeyHelperText || "Your API key is stored locally and never sent to our servers"}
                      sx={{ mb: 2 }}
                    />
                    
                    {/* Language Selection */}
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      {translations[language]?.preferredLanguage || "Preferred Language"}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                      {['English', 'French', 'Spanish'].map((lang) => (
                        <Box 
                          key={lang} 
                          sx={{ 
                            p: 2, 
                            border: '1px solid',
                            borderColor: userPreferredLanguage === lang ? 'primary.main' : 'grey.300',
                            borderRadius: 1,
                            backgroundColor: userPreferredLanguage === lang ? 'primary.light' : 'background.paper',
                            cursor: 'pointer',
                            '&:hover': {
                              borderColor: 'primary.main',
                              backgroundColor: userPreferredLanguage === lang ? 'primary.light' : 'background.paper',
                            }
                          }}
                          onClick={() => setUserPreferredLanguage(lang)}
                        >
                          {lang}
                        </Box>
                      ))}
                    </Box>
                    
                    {/* Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                      <Button onClick={handleProfileCancel} color="inherit">
                        {translations[language]?.cancel || "Cancel"}
                      </Button>
                      <Button 
                        onClick={handleProfileSave} 
                        color="primary"
                        variant="contained"
                      >
                        {translations[language]?.save || "Save"}
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
          {step === 'input' && (
            <OpinionInput
              onSubmitWithMode={handleOpinionAndModeSubmit}
              opinionText={opinion}
              onOpinionChange={setOpinion}
              selectedLanguage={language}
            />
          )}

          {loading && <ResponseDisplay loading={loading} selectedLanguage={language} />}

          {step === 'response' && !loading && (
            <ResponseDisplay
              loading={loading}
              response={response}
              onReaction={handleReaction}
              onStartNewOpinion={handleStartNewOpinion}
              selectedLanguage={language}
            />
          )}

          {/* Always show OpinionLogDisplay, it has internal handling for empty state */}
          <OpinionLogDisplay 
            opinionLog={opinionLog} 
            onLogEntrySelect={handleLogEntrySelect} 
            selectedLanguage={language} 
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App

