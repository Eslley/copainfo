import { CalendarMonth, FormatListBulleted, SportsSoccer } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"

function TabsFooter() {

  const navigate = useNavigate()

  return (
    <Paper sx={{  position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        sx={{ span: { color: 'black' }, svg: { fontSize: 32, color: "#984B43" } }}
      >
        <BottomNavigationAction onClick={() => navigate('/copainfo/jogos-do-dia')} label="Jogos do Dia" icon={<SportsSoccer />} />
        <BottomNavigationAction onClick={() => navigate('/copainfo/calendario')} label="Calendário" icon={<CalendarMonth />} />
        <BottomNavigationAction onClick={() => navigate('/copainfo/grupos')} label="Grupos" icon={<FormatListBulleted />} />
      </BottomNavigation>
    </Paper>
  )
}

export default TabsFooter