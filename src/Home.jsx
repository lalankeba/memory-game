import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { GridImage } from "./components/GridImage";

const imagesBasePath = '/images';
const animalsBasePath = '/animals';
const animalsPath = imagesBasePath + animalsBasePath + '/';

export const Home = () => {

  const [numberOfCards, setNumberOfCards] = useState(12);
  const [displayCards, setDisplayCards] = useState([]);

  const uniqueAnimalCards = [
    {name: "pig", img: "pig.png", path: animalsPath},
    {name: "chicken", img: "chicken.png", path: animalsPath},
    {name: "deer", img: "deer.png", path: animalsPath},
    {name: "manta", img: "manta.png", path: animalsPath},
    {name: "owl", img: "owl.png", path: animalsPath},
    {name: "panda", img: "panda.png", path: animalsPath},
    {name: "snail", img: "snail.png", path: animalsPath},
    {name: "spider", img: "spider.png", path: animalsPath},
    {name: "fox", img: "fox.png", path: animalsPath},
    {name: "elephant", img: "elephant.png", path: animalsPath},
    {name: "zebra", img: "zebra.png", path: animalsPath},
    {name: "kangaroo", img: "kangaroo.png", path: animalsPath},
    {name: "monkey", img: "monkey.png", path: animalsPath},
    {name: "horse", img: "horse.png", path: animalsPath}
  ];

  const shuffleCards = (array) => {
    return array.toSorted(() => 0.5 - Math.random());
  }

  const getDisplayCards = (array, numOfUniqueItems) => {
    let shuffledCards = shuffleCards(array);
    shuffledCards = shuffledCards.slice(0, numOfUniqueItems);
    shuffledCards = shuffledCards.concat(shuffledCards);
    return shuffleCards(shuffledCards);
}

  useEffect(() => {
    const numberOfUniqueCards = numberOfCards / 2;
    setDisplayCards(getDisplayCards(uniqueAnimalCards, numberOfUniqueCards));
  }, [numberOfCards]);


  const gridItemRef = useRef(null);
  const [isPortrait, setIsPortrait] = useState(null);

  useEffect(() => {
    console.log(gridItemRef);

    if (gridItemRef.current) {
      const { clientWidth, clientHeight } = gridItemRef.current;
      console.log(clientWidth, clientHeight);
      setIsPortrait(clientHeight > clientWidth);
      console.log(isPortrait);
    } else {
      console.log('no useRef');
    }
  }, []); 


  return (
    <>
    <Box py={2} my={0}>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, my: 0 }}>
          <Grid container spacing={0}>
            { displayCards.map((uniqueCard, index) => (
              // <GridImage key={uniqueCard.name + index} imageSrc={uniqueCard.path + uniqueCard.img} />
              <Grid item key={uniqueCard.name + index} xs={3} sm={3} md={3} lg={3} p={1}
                sx={{ maxHeight: '256px', border: '1px solid red', backgroundColor: 'gray' }}>
                <Box ref={gridItemRef} display="flex" justifyContent="center" alignItems="center"
                  height="100%" width="100%">
                  <img src={uniqueCard.path + uniqueCard.img} alt={uniqueCard.name} 
                    style={{width: '100%', display: 'block', border: '1px solid black'}} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
    </>
  )
}
