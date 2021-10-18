import { useEffect, useState } from "react";
import { Panel } from "@/components";
import useCards from "@/hooks/useCards";

export function Game() {
  const { cards, isLoadingCards, fetchCards } = useCards();

  useEffect(() => {
    fetchCards();
  }, []);

  if (isLoadingCards) {
    return <p>Cargando...</p>;
  }

  return <Panel cards={cards} />;
}
