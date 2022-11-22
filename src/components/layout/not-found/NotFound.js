import { Error } from '@mui/icons-material'
import { Box } from '@mui/material'

function NotFound() {
    return (
        <Box sx={{ fontSize: '2em', mt: '20vh' }} textAlign="center" color="white">
            <Error sx={{ fontSize: '90px' }} />
            <p>Página não encontrada!</p>
        </Box>
    )
}

export default NotFound