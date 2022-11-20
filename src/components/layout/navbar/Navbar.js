import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <AppBar sx={{ backgroundColor: '#233237' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link style={{ textDecoration: 'none', color: '#fff' }} to="/copainfo">
            CopaInfo 2022
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar