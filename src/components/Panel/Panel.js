import { useEffect } from "react";
import { Card } from "@/components/Card/Card";
import useCards from "@/hooks/useCards";

import styles from "./Panel.module.scss";

export function Panel({ cards }) {
  const {
    blockedNames,
    flippedIds,
    handleClickCard,
    flippedCards,
    handleTurn,
    winGame,
  } = useCards();

  useEffect(() => {
    handleTurn();
  }, [JSON.stringify(flippedCards)]);

  useEffect(() => {
    winGame();
  }, [blockedNames.length]);

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <Card
          key={card.id}
          image={card.image}
          isFlipped={flippedIds.includes(card.id)}
          onClick={() => handleClickCard(card)}
          isBlocked={blockedNames.includes(card.name)}
        />
      ))}
    </div>
  );
}
