import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import TabsFooter from "./components/layout/tabs/TabsFooter";
import Calendar from "./pages/calendar/Calendar";
import DaysGames from "./pages/days-games/DaysGames";
import Groups from "./pages/groups/Groups";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Navbar />

      <Container sx={{ mt: '4em', pb: '1em' }}>
        <Routes>
          <Route path='/copainfo' element={<Home />} />
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
