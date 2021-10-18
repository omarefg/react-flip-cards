import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Header } from "@/components";
import { Game, Success } from "@/pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route path="/" exact>
            <Game />
          </Route>
          <Route path="/success" exact>
            <Success />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
