import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useAlertMessage } from '../../components/alert/AlertMessageProvider'
import EmptyState from '../../components/layout/empty/EmptyState'
import { useLoader } from '../../components/loading/LoadingProvider'
import teamServices from '../../providers/http-services/team'
import flags from '../../providers/utils/flags'

var groupsData = []

teamServices.allTeams()
  .then(res => {
    console.log(res.data.groups)
    if (res.status === 200) {
      groupsData = res.data
    }
  })
  .catch(err => {
    console.log(err)
  })

function Groups() {

  const [groups, setGroups] = useState([])

  const { showAlert } = useAlertMessage()

  const { startLoader, stopLoader } = useLoader()

  useEffect(() => {
    // startLoader()

    // teamServices.allTeams()
    //   .then(res => {
    //     console.log(res.data.groups)
    //     if (res.status === 200) {
    //       setGroups(res.data.groups)
    //     }

    //     stopLoader()
    //   })
    //   .catch(err => {
    //     stopLoader()

    //     console.log(err)
    //     showAlert('', 'Erro ao recuperar grupos, tente novamente após 1 minuto!', 'error', 5000)
    //   })
    setGroups(groupsData.groups)
  }, [groupsData])

  return (
    <Box mb="5em" pt="1em">
      {!!groups && groups.length > 0 ? (
        groups.map((grupo, indexG) => (
          <>
            <Typography sx={{ fontSize: 22, color: "white", marginTop: '1em', marginBottom: '1em' }} >Grupo {grupo.letter}</Typography>
            <TableContainer key={indexG} component={Paper} sx={{ backgroundColor: '#e5e5e5' }}>
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
                    <TableRow key={indexG + '-' +indexT}>

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
          </>
        ))

      ) : (
        <EmptyState message="Sem informações no momento!" />
      )

      }
    </Box>
  )
}

export default Groups