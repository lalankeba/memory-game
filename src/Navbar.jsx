import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';

export const Navbar = ({toggleTheme}) => {

  const [isLight, setIsLight] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    theme.palette.mode === 'light' ? setIsLight(true) : setIsLight(false);
  }, [theme.palette.mode]);
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" component="div">Memory Game</Typography>
            <IconButton onClick={toggleTheme} color="secondary" aria-label="change theme" sx={{ marginLeft: 'auto' }}>
              { isLight && <DarkModeIcon /> }
              { !isLight && <LightModeIcon /> }
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
