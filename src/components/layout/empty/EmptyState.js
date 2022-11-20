import { Block } from '@mui/icons-material'
import { Box } from '@mui/material'

function EmptyState({ message }) {
    return (
        <Box sx={{ fontSize: '2em', mt: '20vh' }} textAlign="center" color="white">
            <Block sx={{ fontSize: '90px' }} />
            <p>{message}</p>
        </Box>
    )
}

export default EmptyState