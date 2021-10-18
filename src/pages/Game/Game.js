import { useEffect, useState } from "react";
import { Panel } from "@/components";
import { shuffle } from '@/utils/array'

export function Game() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cards")
      .then((res) => res.json())
      .then((res) => {
        setCards(shuffle(res));
      });
  }, []);

  return <Panel cards={cards} />;
}
