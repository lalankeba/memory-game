import { Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const GridImage = ({ imageSrc }) => {
  const [isPortrait, setIsPortrait] = useState(null);
  const gridItemRef = useRef();

  useEffect(() => {
    if (gridItemRef.current) {
      const { clientWidth, clientHeight } = gridItemRef.current;
      setIsPortrait(clientHeight > clientWidth);
    }
  }, []);

  return (
    <Grid item xs={3} sm={3} md={3} lg={3} sx={{ border: '1px solid red' }}>
      <Box ref={gridItemRef}
        display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
        <img src={imageSrc} alt="Responsive"
          style={{
            width: isPortrait === true ? '100%' : 'auto',
            height: isPortrait === false ? '100%' : 'auto',
            border: '1px solid black'
          }}
        />
      </Box>
    </Grid>
  )
}
