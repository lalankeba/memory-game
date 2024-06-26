import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Optionsbar } from "./Optionsbar";
import { useTheme } from "@emotion/react";

const imagesBasePath = '/images';
const animalsBasePath = '/animals';
const animalsPath = imagesBasePath + animalsBasePath + '/';
const initImage = 'init-dark.png';

let selectedImgElements = [];
let waitingToFlip = false;
let matchedImgElements = []; // change the picture for already matched img elements, when theme changes

export const Home = () => {

  const [numberOfCards, setNumberOfCards] = useState(8);
  const [displayCards, setDisplayCards] = useState([]);
  const [xsWidth, setXsWidth] = useState(1);
  const [smWidth, setSmWidth] = useState(1);
  const [mdWidth, setMdWidth] = useState(1);
  const [lgWidth, setLgWidth] = useState(1);
  const [isWon, setIsWon] = useState(false);
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [whiteImage, setWhiteImage] = useState('white.png');

  const theme = useTheme();

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

  const onCardClick = (card, e) => {
    if (!waitingToFlip) {
      const imageElement = e.target;

      if (imageElement.getAttribute('data-clicked') === "no") {
        imageElement.setAttribute('data-clicked', "yes");
        imageElement.style.cursor = 'auto';
        imageElement.src = card.path + card.img;

        selectedImgElements.push(imageElement);
        setTotalClicks((prevTotalClicks) => prevTotalClicks + 1);

        if (selectedImgElements.length === 2) {
          waitingToFlip = true;
          const imgElement1 = selectedImgElements[0];
          const imgElement2 = selectedImgElements[1];

          let newImgSrc = imagesBasePath + '/' + whiteImage;
          let cursorStyle = 'auto';
          if (imgElement1.src === imgElement2.src) { // match found
            newImgSrc = imagesBasePath + '/' + whiteImage;
            setTotalMatches((prevTotalMatches) => prevTotalMatches + 1);
            matchedImgElements.push(imgElement1, imgElement2);
          } else { // not a match
            newImgSrc = imagesBasePath + '/' + initImage;
            imgElement1.setAttribute('data-clicked', "no");
            imgElement2.setAttribute('data-clicked', "no");
            cursorStyle = 'pointer';
          }
          selectedImgElements = [];
          setTimeout(() => {resetElements(imgElement1, imgElement2, newImgSrc, cursorStyle)}, 800);
        }
        
      }
    }
  }

  useEffect(() => {
    const newImage = theme.palette.mode === 'light' ? 'white.png' : 'black.png';
    setWhiteImage(newImage);
  }, [theme]);

  useEffect(() => {
    matchedImgElements.map((imgElement) => {
      imgElement.src = imagesBasePath + '/' + whiteImage;
    });
  }, [whiteImage]);

  useEffect(() => {
    if (totalMatches * 2 === numberOfCards) {
      setAccuracy(((numberOfCards / totalClicks) * 100).toFixed(2));
      setIsWon(true);
    }
  }, [totalMatches]);

  const resetElements = (element1, element2, imgSrc, cursorStyle) => {
    element1.src = imgSrc;
    element2.src = imgSrc;

    element1.style.cursor = cursorStyle;
    element2.style.cursor = cursorStyle;

    waitingToFlip = false;
  }

  const getDisplayCards = (array, numOfUniqueItems) => {
    let shuffledCards = shuffleCards([...array]); // Make a copy
    shuffledCards = shuffledCards.slice(0, numOfUniqueItems);
    const doubledCards = shuffledCards.map(card => ({ ...card })); // Create new references
    const cardsWithIDs = doubledCards.concat(doubledCards).map((card, index) => {
        return {
            ...card,
            id: index + Math.random()
        };
    });
    return shuffleCards(cardsWithIDs);
  };

  useEffect(() => {
    refreshPage();
  }, [numberOfCards]);

  const refreshPage = () => {
    const numberOfUniqueCards = numberOfCards / 2;
    setDisplayCards(getDisplayCards(uniqueAnimalCards, numberOfUniqueCards));
    adjustWidthValues();

    waitingToFlip = false;
    selectedImgElements = [];
    setIsWon(false);
    setTotalMatches(0);
    setTotalClicks(0);
    setAccuracy(0);
    matchedImgElements = [];
  }

  const onNumOfCardsChanged = (numOfCards) => {
    setNumberOfCards(numOfCards);
  }

  const adjustWidthValues = () => {
    if (numberOfCards === 8) {
      setXsWidth(12/4); // 2 rows
      setSmWidth(12/4); // 2 rows
      setMdWidth(12/4); // 2 rows
      setLgWidth(12/4); // 2 rows
    } else if (numberOfCards === 12) {
      setXsWidth(12/3); // 4 rows
      setSmWidth(12/6); // 2 rows
      setMdWidth(12/4); // 3 rows
      setLgWidth(12/6); // 2 rows
    } else if (numberOfCards === 16) {
      setXsWidth(12/4); // 4 rows
      setSmWidth(12/8); // 2 rows
      setMdWidth(12/8); // 2 rows
      setLgWidth(12/8); // 2 rows
    } else if (numberOfCards === 20) {
      setXsWidth(12/4); // 5 rows
      setSmWidth(12/10); // 2 rows
      setMdWidth(12/5); // 4 rows
      setLgWidth(12/10); // 2 rows
    } else if (numberOfCards === 24) {
      setXsWidth(12/4); // 6 rows
      setSmWidth(12/8); // 3 rows
      setMdWidth(12/6); // 4 rows
      setLgWidth(12/8); // 3 rows
    }
  }

  return (
    <>
    <Optionsbar onNumOfCardsChanged={onNumOfCardsChanged} />
    <Box py={2} my={0}>
      <Container maxWidth="lg">
        { isWon ? 
        <Box sx={{ my: 1 }} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
          <Typography variant="h2" component="h1" gutterBottom>Congrats !</Typography>
          <Typography variant="h4" gutterBottom>You won</Typography>
          <Typography variant="body1">Number of cards: {numberOfCards} Total Clicks: {totalClicks}</Typography>
          <Typography variant="body1">Accuracy {accuracy}%</Typography>
        </Box>
        :
        <Box sx={{ flexGrow: 1, my: 1 }}>
          <Grid container spacing={1}>
            { displayCards.map((displayCard) => (
              <Grid item key={displayCard.id} xs={xsWidth} sm={smWidth} md={mdWidth} lg={lgWidth} p={1} >
                <Box display="flex" justifyContent="center" alignItems="center"
                  height="100%" width="100%">
                  <img src={`${imagesBasePath}/${initImage}`} alt={displayCard.name} onClick={(e) => onCardClick(displayCard, e)}
                    style={{width: '100%', display: 'block', cursor: 'pointer'}} data-clicked="no" />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        }
      </Container>
    </Box>
    </>
  )
}
