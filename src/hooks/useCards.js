import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { shuffle } from "@/utils/array";
import { isOdd } from "@/utils/validators";

export default function useCards() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [blockedNames, setBlockedNames] = useState([]);
  const [turn, setTurn] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);

  const { push } = useHistory();

  const flippedIds = flippedCards.map(({ id }) => id);
  const flippedNames = flippedCards.map(({ name }) => name);

  const preloadCardImage = (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        resolve();
      };
    });
  };

  const removeFlippedCard = (card) =>
    setFlippedCards((prevState) =>
      prevState.filter(({ id }) => id !== card.id)
    );

  const handleClickCard = (card) => {
    if (flippedIds.includes(card.id)) {
      removeFlippedCard(card);
      setTurn(turn.filter(({ id }) => card.id));
    } else {
      setFlippedCards([...flippedCards, card]);
      setTurn([...turn, card]);
    }
  };

  const winGame = () => {
    if (blockedNames.length === 6) {
      setTimeout(() => {
        push("/success");
      }, 1000);
    }
  };

  const handleTurn = () => {
    const nameToBlock = [...new Set(flippedNames)].find(
      (name) =>
        !blockedNames.includes(name) &&
        flippedNames.filter((flippedName) => flippedName === name).length > 1
    );

    if (nameToBlock) {
      setBlockedNames([...blockedNames, nameToBlock]);
      setTurn([]);
    } else {
      if (!isOdd(flippedCards.length)) {
        turn.forEach((card) => {
          setTimeout(() => {
            removeFlippedCard(card);
          }, 250);
        });
      }
    }
  };

  const fetchCards = () => {
    setIsLoadingCards(true);
    fetch("https://react-flip-cards.s3.sa-east-1.amazonaws.com/cards.json")
      .then((res) => res.json())
      .then((res) => {
        let preloadedImages = [];
        for (const { image } of res) {
          preloadedImages.push(preloadCardImage(image));
        }
        Promise.all(preloadedImages)
          .then(() => {
            setCards(shuffle(res));
          })
          .finally(() => {
            setIsLoadingCards(false);
          });
      });
  };

  return {
    blockedNames,
    flippedIds,
    handleClickCard,
    handleTurn,
    flippedCards,
    winGame,
    fetchCards,
    cards,
    isLoadingCards,
  };
}
