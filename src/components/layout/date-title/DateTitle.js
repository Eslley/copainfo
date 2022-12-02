import { Box, Typography } from "@mui/material"
import { Event } from "@mui/icons-material"
import moment from "moment"

function DateTitle({ date }) {
    return (
        <Box bgcolor="#984B43" borderRadius="5px" p="0.3em" display="flex" justifyContent="center" alignItems="center" columnGap="0.5em" mt="2em" mb="1em">
            <Event />
            <Typography variant="h6" >
                {moment(date).format("ll")}
            </Typography>
        </Box>
    )
}

export default DateTitle