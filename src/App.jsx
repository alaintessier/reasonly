import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
// Import from our barrel file to avoid casing issues
import { ThemeProvider, createTheme, CssBaseline, Container } from './components/mui';
import OpinionInput from './components/OpinionInput';
// ModeSelector is no longer needed
import ResponseDisplay from './components/ResponseDisplay';
import OpinionLogDisplay from './components/OpinionLogDisplay'; // Import the new component
import './App.css';

function App() {
  const [step, setStep] = useState('input');
  const [opinion, setOpinion] = useState('');
  const [mode, setMode] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [opinionLog, setOpinionLog] = useState(() => {
    try {
      const storedLog = localStorage.getItem('reasonlyOpinionLog');
      return storedLog ? JSON.parse(storedLog) : [];
    } catch (error) {
      console.error("Failed to load opinion log from localStorage on init:", error);
      return [];
    }
  });

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#0078d4',
      },
    },
  });

  // Effect to save opinion log to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('reasonlyOpinionLog', JSON.stringify(opinionLog));
    } catch (error) {
      console.error("Failed to save opinion log to localStorage:", error);
    }
  }, [opinionLog]);

  // Combined handler for submitting opinion and selected mode
  const handleOpinionAndModeSubmit = async (text, selectedMode) => {
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
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not found. Make sure VITE_OPENAI_API_KEY is set in your .env file.');
      setResponse('Error: OpenAI API key not configured. Please contact support.');
      setLoading(false);
      return;
    }

    let promptContent = `The user's opinion is: "${text}". `;
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
          { role: 'system', content: 'You are a helpful assistant that analyzes user opinions.' },
          { role: 'user', content: promptContent }
        ]
      });

      if (apiResponse.data.choices && apiResponse.data.choices.length > 0) {
        setResponse(apiResponse.data.choices[0].message.content);
      } else {
        setResponse('Received an unexpected response from the AI.');
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      if (error.response) {
        setResponse(`Error: ${error.response.data.error?.message || 'Failed to get response from AI.'}`);
      } else if (error.request) {
        setResponse('Error: No response received from AI. Check your network connection.');
      } else {
        setResponse('Error: Could not fetch AI response. Please try again.');
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
      <Container>
        {step === 'input' && 
          <OpinionInput 
            onSubmitWithMode={handleOpinionAndModeSubmit} // Updated prop name and handler
            opinionText={opinion} 
            onOpinionChange={setOpinion} 
          />
        }
        {/* {step === 'mode' && <ModeSelector onSelect={handleModeSelect} />} ModeSelector step is removed */}
        {step === 'response' && (
          <ResponseDisplay
            loading={loading}
            response={response}
            onReaction={handleReaction}
            onStartNewOpinion={handleStartNewOpinion} // Pass the new handler
          />
        )}
        {/* Display the opinion log if there are any entries */}
        {opinionLog.length > 0 && 
          <OpinionLogDisplay 
            opinionLog={opinionLog} 
            onLogEntrySelect={handleLogEntrySelect} // Pass the new handler
          />
        }
      </Container>
    </ThemeProvider>
  )
}

export default App
