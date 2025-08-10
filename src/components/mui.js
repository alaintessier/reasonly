// Barrel file to re-export MUI components with consistent casing
// This avoids the casing issues with imports

// Individual exports for commonly used components
export { default as Box } from '@mui/material/Box';
export { default as Button } from '@mui/material/Button';
export { default as CircularProgress } from '@mui/material/CircularProgress';
export { default as Container } from '@mui/material/Container';
export { default as CssBaseline } from '@mui/material/CssBaseline';
export { default as Paper } from '@mui/material/Paper';
export { default as TextField } from '@mui/material/TextField';
export { default as Typography } from '@mui/material/Typography';
export { default as List } from '@mui/material/List';
export { default as ListItem } from '@mui/material/ListItem';
export { default as ListItemButton } from '@mui/material/ListItemButton';
export { default as ListItemText } from '@mui/material/ListItemText'; // Added for OpinionLogDisplay
export { default as FormControl } from '@mui/material/FormControl'; // Added for OpinionInput language select
export { default as InputLabel } from '@mui/material/InputLabel'; // Added for OpinionInput language select
export { default as Select } from '@mui/material/Select'; // Added for OpinionInput language select
export { default as MenuItem } from '@mui/material/MenuItem'; // Added for OpinionInput language select
export { default as Menu } from '@mui/material/Menu'; // Added for language menu
export { default as Popover } from '@mui/material/Popover'; // Added for language menu
export { default as IconButton } from '@mui/material/IconButton'; // Added for ResponseDisplay reaction buttons

// Theme related
export { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

// Icons
export { default as ArrowBackIcon } from '@mui/icons-material/ArrowBack';
export { default as AutorenewIcon } from '@mui/icons-material/Autorenew';
export { default as BalanceIcon } from '@mui/icons-material/Balance'; 
export { default as SearchIcon } from '@mui/icons-material/Search';
export { default as ThumbUpIcon } from '@mui/icons-material/ThumbUp';
export { default as ThumbDownIcon } from '@mui/icons-material/ThumbDown';
export { default as FactCheckIcon } from '@mui/icons-material/FactCheck';
export { default as PsychologyIcon } from '@mui/icons-material/Psychology';
export { default as LanguageIcon } from '@mui/icons-material/Language';
