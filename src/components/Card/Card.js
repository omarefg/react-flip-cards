import { useEffect, useState } from "react";
import clsx from "clsx";
import cardBackground from "@/assets/back.jpeg";
import styles from "./Card.module.scss";

export function Card({ image, isFlipped, onClick, isBlocked }) {
  const [isBigger, setIsBigger] = useState(false)

  useEffect(() => {
    if (isBlocked) {
      setIsBigger(true)
      setTimeout(() => {
        setIsBigger(false)
      }, 500)
    }
  }, [isBlocked])

  return (
    <div
      className={clsx(styles.container, {
        [styles.blocked]: isBlocked,
        [styles.bigger]: isBigger
      })}
      onClick={!isBlocked ? onClick : undefined}
    >
      <img className={styles.image} src={isFlipped ? image : cardBackground} />
    </div>
  );
}
