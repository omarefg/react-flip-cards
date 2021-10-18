import { useState } from "react";
import clsx from "clsx";
import cardBackground from "@/assets/back.jpeg";
import styles from "./Card.module.scss";

export function Card({ image, isFlipped, onClick, isBlocked }) {
  return (
    <div
      className={clsx(styles.container, { [styles.blocked]: isBlocked })}
      onClick={!isBlocked ? onClick : undefined}
    >
      <img className={styles.image} src={isFlipped ? image : cardBackground} />
    </div>
  );
}
