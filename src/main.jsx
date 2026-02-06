import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CssBaseline from "@mui/material/CssBaseline"; // normalize CSS
import { ThemeProvider, createTheme } from "@mui/material/styles";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
