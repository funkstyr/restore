import { useState } from 'react';
// import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import 'app/App.css';
import Header from 'app/components/Header';
import Routes from 'pages/routes';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const mode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: darkMode ? '#121212' : '#eaeaea',
      },
    },
  });

  const toggleMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      {/* <ToastContainer position="bottom-right" hideProgressBar> */}
      <CssBaseline />

      <Header toggleMode={toggleMode} isDarkMode={darkMode} />

      <Container sx={{ mt: 2 }}>
        <Routes />
      </Container>
      {/* </ToastContainer> */}
    </ThemeProvider>
  );
}

export default App;
