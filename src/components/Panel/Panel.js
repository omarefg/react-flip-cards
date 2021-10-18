import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card } from "@/components/Card/Card";
import { isOdd } from "@/utils/validators";
import styles from "./Panel.module.scss";

export function Panel({ cards }) {
  const [flippedCards, setFlippedCards] = useState([]);
  const [blockedNames, setBlockedNames] = useState([]);
  const [playingCard, setPlayingCard] = useState(false);
  const { push } = useHistory();

  const flippedIds = flippedCards.map(({ id }) => id);
  const flippedNames = flippedCards.map(({ name }) => name);

  const removeCard = (card) => setFlippedCards(flippedCards.filter(({ id }) => id !== card.id));

  const handleClickCard = (card) => {
    if (flippedIds.includes(card.id)) {
      removeCard(card);
      setPlayingCard(null);
    } else {
      setFlippedCards([...flippedCards, card]);
      setPlayingCard(card);
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
    } else {
      if (playingCard && !isOdd(flippedCards.length)) {
        setTimeout(() => {
          removeCard(playingCard);
        }, 250)
      }
    }
  }, [JSON.stringify(flippedCards)]);

  useEffect(() => {
    if (blockedNames.length === 6) {
      setTimeout(() => {
        push("/success");
      }, 500);
    }
  }, [blockedNames.length]);

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            image={`http://localhost:3000${card.image}`}
            isFlipped={flippedIds.includes(card.id)}
            onClick={() => handleClickCard(card)}
            isBlocked={blockedNames.includes(card.name)}
          />
        );
      })}
    </div>
  );
}
