import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlertMessageProvider from "./components/alert/AlertMessageProvider";
import Navbar from "./components/layout/navbar/Navbar";
import TabsFooter from "./components/layout/tabs/TabsFooter";
import LoadingProvider from "./components/loading/LoadingProvider";
import Calendar from "./pages/calendar/Calendar";
import DaysGames from "./pages/days-games/DaysGames";
import Groups from "./pages/groups/Groups";
import Home from "./pages/home/Home";
import MinhaSelecao from "./pages/minha-selecao/MinhaSelecao";

function App() {
  return (
    <Router>
      <Navbar />

      <Container sx={{ mt: '4em', pb: '1em' }}>
        <LoadingProvider>
          <AlertMessageProvider>
            <Routes>
              <Route path='/copainfo' element={<Home />} />
              <Route path='/copainfo/favorita' element={<MinhaSelecao />} />
              <Route path='/copainfo/jogos-do-dia' element={<DaysGames />} />
              <Route path='/copainfo/calendario' element={<Calendar />} />
              <Route path='/copainfo/grupos' element={<Groups />} />
            </Routes>
          </AlertMessageProvider>
        </LoadingProvider>
      </Container>

      <TabsFooter />
    </Router>
  )
}

export default App;
