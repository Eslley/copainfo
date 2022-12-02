import { Event } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import EmptyState from "../../components/layout/empty/EmptyState"
import CardMatch from "../days-games/CardMatch"

function FirstStage({ firstStage }) {
    return (
        <>
            {Object.keys(firstStage).length !== 0 ? (

                Object.keys(firstStage).map((date, indexD) => (
                    <div id={moment(date).format("MM-DD")} tabIndex={indexD} key={indexD}>

                        <Box bgcolor="#984B43" borderRadius="5px" p="0.3em" display="flex" justifyContent="center" alignItems="center" columnGap="0.5em" mt="2em" mb="1em">
                            <Event />
                            <Typography variant="h6" >
                                {moment(date).format("ll")}
                            </Typography>
                        </Box>

                        {firstStage[date].map((match, indexM) => (
                            <CardMatch key={indexD + "" + indexM} match={match} />
                        ))}
                    </div>
                ))

            ) : <EmptyState message="Sem informações no momento!" />}
        </>
    )
}

export default FirstStage