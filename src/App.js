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
          <Route path='/copa' element={<Home />} />
          <Route path='/copa/jogos-do-dia' element={<DaysGames />} />
          <Route path='/copa/calendario' element={<Calendar />} />
          <Route path='/copa/grupos' element={<Groups />} />
        </Routes>
      </Container>

      <TabsFooter />
    </Router>
  )
}

export default App;
