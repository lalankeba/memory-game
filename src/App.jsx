import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import { Home } from './Home';
import { Navbar } from './Navbar';
import { useState } from 'react';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <Navbar toggleTheme={toggleTheme} />
      </header>
      <main>
        <Home />
      </main>
    </ThemeProvider>
  )
}

export default App
