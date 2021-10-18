import { isOdd } from "@/utils/validators";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function useCards() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [blockedNames, setBlockedNames] = useState([]);
  const [turn, setTurn] = useState([]);
  const { push } = useHistory();

  const flippedIds = flippedCards.map(({ id }) => id);
  const flippedNames = flippedCards.map(({ name }) => name);

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

  useEffect(() => {
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
  }, [JSON.stringify(flippedCards)]);

  useEffect(() => {
    if (blockedNames.length === 6) {
      setTimeout(() => {
        push("/success");
      }, 1000);
    }
  }, [blockedNames.length]);

  return {
    blockedNames,
    flippedIds,
    handleClickCard
  };
}
