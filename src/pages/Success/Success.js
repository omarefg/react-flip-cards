import { Link } from "react-router-dom";

export function Success() {
  return (
    <section>
      <p>Felicidades ganaste 😁</p>
      <Link to="/">Volver a jugar</Link>
    </section>
  );
}
