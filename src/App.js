import { Container } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import NotFound from "./components/layout/not-found/NotFound";
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
    <>
      <Navbar />
      <Container sx={{ mt: '4em', pb: '1em' }}>
        <Routes>
          <Route path='/'>
            <Route path='' element={<Home />} />
            <Route path='/favorita' element={<MinhaSelecao />} />
            <Route path='/jogos-do-dia' element={<DaysGames />} />
            <Route path='/calendario' element={<Calendar />} />
            <Route path='/grupos' element={<Groups />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
      </Container>
      <TabsFooter />
    </>
  )
}

export default App;
