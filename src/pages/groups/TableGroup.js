import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import flags from '../../providers/utils/flags'

function TableGroup({ grupo, indexG }) {
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#e5e5e5' }}>
            <Table sx={{ minWidth: 400 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Classificação</TableCell>
                        <TableCell align="center">P</TableCell>
                        <TableCell align="center">J</TableCell>
                        <TableCell align="center">V</TableCell>
                        <TableCell align="center">E</TableCell>
                        <TableCell align="center">D</TableCell>
                        <TableCell align="center">SG</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {grupo.teams.map((team, indexT) => (
                        <TableRow key={indexG + '-' + indexT}>

                            <TableCell>

                                <Grid container alignItems="center" gap="0.5em" wrap="nowrap">
                                    <Grid item sx={{ color: indexT === 0 || indexT === 1 ? "#d32f2f" : "" }}>
                                        {indexT + 1}
                                    </Grid>
                                    <Grid item>
                                        <img src={flags[team.country]} width="20" height="15" />
                                    </Grid>
                                    <Grid item>
                                        {team.name}
                                    </Grid>
                                </Grid>

                            </TableCell>

                            <TableCell align="center">
                                {team.group_points}
                            </TableCell>

                            <TableCell align="center">
                                {team.games_played}
                            </TableCell>

                            <TableCell align="center">
                                {team.wins}
                            </TableCell>

                            <TableCell align="center">
                                {team.draws}
                            </TableCell>

                            <TableCell align="center">
                                {team.losses}
                            </TableCell>

                            <TableCell align="center">
                                {team.goals_for - team.goals_against}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableGroup