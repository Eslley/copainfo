import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import EmptyState from '../../components/layout/empty/EmptyState'
import teamServices from '../../providers/http-services/team'
import TableGroup from './TableGroup'

const compareCallBack = (team1, team2) => {
  if (team1.group_points < team2.group_points) 
    return 1

  if (team1.group_points > team2.group_points) 
    return -1

  // if the teams have the same points number, use the goal balance (goals_for - goals_against) as criteria
  if (team1.group_points === team2.group_points) {
    const saldoGTeam1 = team1.goals_for - team1.goals_against
    const saldoGTeam2 = team2.goals_for - team2.goals_against

    if (saldoGTeam1 <  saldoGTeam2)
      return 1

    if (saldoGTeam1 >  saldoGTeam2)
      return -1

    // if also draw in goal balance use most goals scored (goals_for) as criteria
    if (saldoGTeam1 === saldoGTeam2){
      if(team1.goals_for < team2.goals_for)
        return 1

        if(team1.goals_for > team2.goals_for)
        return -1
    }

  }

  return 0
}

export var groupsData = []

teamServices.allTeams()
  .then(res => {
    
    if (res.status === 200) {
      groupsData = res.data

      // ordena classificação dos times em cada grupo
      groupsData.groups.forEach(grupo => {
        grupo.teams = grupo.teams.sort(compareCallBack)
      })

      console.log(groupsData.groups)
    }
  })
  .catch(err => {
    console.log(err)
  })

function Groups() {

  const [groups, setGroups] = useState([])

  useEffect(() => {
    setGroups(groupsData.groups)
  }, [groupsData])

  return (
    <Box mb="5em" pt="1em">
      {!!groups && groups.length > 0 ? (
        groups.map((grupo, indexG) => (
          <div key={indexG}>
            <Typography sx={{ fontSize: 22, color: "white", marginTop: '1em', marginBottom: '1em' }} >Grupo {grupo.letter}</Typography>
            
            <TableGroup grupo={grupo} indexG={indexG} />

          </div>
        ))

      ) : (
        <EmptyState message="Sem informações no momento!" />
      )

      }
    </Box>
  )
}

export default Groups