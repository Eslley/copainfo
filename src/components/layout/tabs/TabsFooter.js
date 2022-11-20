import { CalendarMonth, FormatListBulleted, SportsSoccer } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function TabsFooter() {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=> {
    console.log(location)
  }, [])

  return (
    <Paper sx={{  position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        sx={{ span: { color: 'black' }, svg: { fontSize: 32, color: "#984B43" } }}
      >
        <BottomNavigationAction sx={{ backgroundColor: location.pathname === '/copainfo/jogos-do-dia' ? '#b6c6cb' : '' }} onClick={() => navigate('/copainfo/jogos-do-dia')} label="Jogos do Dia" icon={<SportsSoccer />} />
        <BottomNavigationAction sx={{ backgroundColor: location.pathname === '/copainfo/calendario' ? '#b6c6cb' : '' }} onClick={() => navigate('/copainfo/calendario')} label="Calendário" icon={<CalendarMonth />} />
        <BottomNavigationAction sx={{ backgroundColor: location.pathname === '/copainfo/grupos' ? '#b6c6cb' : '' }} onClick={() => navigate('/copainfo/grupos')} label="Grupos" icon={<FormatListBulleted />} />
      </BottomNavigation>
    </Paper>
  )
}

export default TabsFooter