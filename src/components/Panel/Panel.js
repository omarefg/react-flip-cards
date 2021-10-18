import { Card } from "@/components/Card/Card";
import useCards from "@/hooks/useCards";

import styles from "./Panel.module.scss";

export function Panel({ cards }) {
  const {
    blockedNames,
    flippedIds,
    handleClickCard
  } = useCards();

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
