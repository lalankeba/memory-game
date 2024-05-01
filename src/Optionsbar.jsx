import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react";

export const Optionsbar = ({onNumOfCardsChanged}) => {

  const [numOfCards, setNumOfCards] = useState(8);

  const handleChange = (event) => {
    setNumOfCards(event.target.value);
    onNumOfCardsChanged(event.target.value);
  };

  return (
    <>
    <Box pt={2} my={0}>
      <Container maxWidth="lg">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label">Number of Cards</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={numOfCards}
              label="Number of Cards"
              onChange={handleChange}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
    </Box>
    </>
  )
}
