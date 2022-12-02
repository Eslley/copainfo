import { Card, CardContent, Grid, Typography } from "@mui/material"
import moment from "moment"
import 'moment/locale/pt-br';
import flags from "../../providers/utils/flags"
import styles from "./CardMatch.module.css"
import noFlag from "../../assets/no_flag.png"

moment.locale("pt-br")

function CardMatch({ match, showDate }) {

    return (
        <Card sx={{ background: "#1d272a", color: "#fff", minWidth: 275, mb: "1.5em" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14, mb: 1.5 }}>
                    {match.stage_name === "First stage" ? "Grupo " + match.group : ""}

                    {/* (match.id - FIRST_ID_OF_STAGE) The API doesn't return the title of the match but the id of all matches are ordered */}
                    {match.stage_name === "Round of 16" ? "Oitavas " + (match.id - 48) : ""}

                    {match.stage_name === "Quarter-final" ? "Quartas " + (match.id - 56) : ""}

                    {match.stage_name === "Semi-final" ? "Semifinal " + (match.id - 60) : ""}

                    {match.stage_name === "Play-off for third place" ? "3° lugar" : ""}

                    {match.stage_name === "Final" ? "Final" : ""}
                </Typography>

                <Grid container alignItems="center" mb="1em">
                    <Grid container item xs={5} alignItems="center" justifyContent="flex-end" gap="0.4em">
                        {match.home_team.country}
                        {match.home_team.name === "To Be Determined" ?
                            <img src={noFlag} width="30" height="30" /> :
                            <img src={flags[match.home_team.country]} width="27" height="20" />
                        }
                    </Grid>

                    <Grid item xs={2}>
                        {match.status === "completed" || match.status === "in_progress" ? match.home_team.goals : ""}
                        <span style={{ margin: "0 0.2em 0 0.2em" }}>X</span>
                        {match.status === "completed" || match.status === "in_progress" ? match.away_team.goals : ""}
                    </Grid>

                    <Grid container item xs={5} alignItems="center" gap="0.4em">
                        {match.home_team.name === "To Be Determined" ?
                            <img src={noFlag} width="30" height="30" /> :
                            <img src={flags[match.away_team.country]} width="27" height="20" />
                        }
                        {match.away_team.country}
                    </Grid>
                </Grid>

                {showDate === true ?
                    <Typography>
                        {moment(match.datetime).calendar()}
                    </Typography> :
                    <Typography>
                        {moment(match.datetime).format('H:mm')}
                    </Typography>
                }

                <Typography variant="body2">
                    {match.venue}
                </Typography>

                {match.status === "in_progress" ? (
                    <>
                        <Typography color="#EAC67A" variant="h6" component="div">
                            {match.time ?? "Bola Rolando"}
                        </Typography>
                        <div className={styles.liveAnimation}></div>
                    </>) : ""
                }

                {match.status === "completed" ?
                    <Typography color="#EAC67A" variant="h6" component="div">
                        Encerrado
                    </Typography> : ""
                }

            </CardContent>
        </Card>
    )
}

export default CardMatch