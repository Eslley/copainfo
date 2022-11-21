import { Container } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import TabsFooter from "./components/layout/tabs/TabsFooter";
import { useLoader } from "./components/loading/LoadingProvider";
import Calendar from "./pages/calendar/Calendar";
import DaysGames from "./pages/days-games/DaysGames";
import Groups from "./pages/groups/Groups";
import Home from "./pages/home/Home";
import MinhaSelecao from "./pages/minha-selecao/MinhaSelecao";

function App() {

  const { startLoader, stopLoader } = useLoader()

  useEffect(() => {
    startLoader()

    //Waiting request the API
    setTimeout(() => {
      stopLoader()
    }, 3500)
  }, [])

  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: '4em', pb: '1em' }}>
        <Routes>
          <Route path='/copainfo' element={<Home />} />
          <Route path='/copainfo/favorita' element={<MinhaSelecao />} />
          <Route path='/copainfo/jogos-do-dia' element={<DaysGames />} />
          <Route path='/copainfo/calendario' element={<Calendar />} />
          <Route path='/copainfo/grupos' element={<Groups />} />
        </Routes>
      </Container>
      <TabsFooter />
    </Router>
  )
}

export default App;
