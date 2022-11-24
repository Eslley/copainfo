import { Button, FormControl, InputLabel, ListSubheader, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import findGroup, { Groups } from "../../providers/utils/groups";
import flags from '../../providers/utils/flags'
import { useEffect, useState } from "react";
import { Favorite } from "@mui/icons-material";
import { useAlertMessage } from "../../components/alert/AlertMessageProvider";
import matchServices from "../../providers/http-services/match"
import CardMatch from "../days-games/CardMatch";
import { useLoader } from "../../components/loading/LoadingProvider";
import TableGroup from "../groups/TableGroup";
import { groupsData } from "../groups/Groups"

function MinhaSelecao() {

  const [selectFavoriteTeam, setSelectFavoriteTeam] = useState('BRA')
  const [favoriteTeam, setFavoriteTeam] = useState('')
  const [matches, setMatches] = useState([])
  const [group, setGroup] = useState({})

  const { showAlert } = useAlertMessage()

  const { startLoader, stopLoader } = useLoader()

  useEffect(() => {
    const team = localStorage.getItem('favorite')

    if (team != undefined) {
      getMatches(team)
    }

    setFavoriteTeam(team)
  }, [])

  function getGroup(group) {
    startLoader()

    const groupData = groupsData.groups.filter(grupo => grupo.letter === group)

    setGroup(groupData[0])

    stopLoader()
  }

  function getMatches(team) {
    startLoader()

    matchServices.matchesByTeam(team)
      .then(res => {
        if (res.status === 200) {
          let matchesData = res.data
          matchesData.forEach(match => {
            if (match.stage_name === "First stage") {
              const matchGroup = findGroup(match.home_team.country).group

              match.group = matchGroup
            }
          })

          getGroup(matchesData[0].group)

          setMatches(matchesData)
        }

        stopLoader()
      })
      .catch(err => {
        console.log(err)
        showAlert("", "Erro ao recuperar partidas!", "error", 4000)
        stopLoader()
      })
  }

  function options() {
    let options = []

    Groups.forEach(group => {
      options.push(<ListSubheader key={group.group}>Grupo {group.group}</ListSubheader>)
      group.teams.forEach(team => {
        options.push(<MenuItem key={team} value={team}>
          <img style={{ marginRight: "0.5em" }} src={flags[team]} width="20" height="15" />
          {team}
        </MenuItem>)
      })
    })

    return options
  }

  const handleChange = (e) => {
    setSelectFavoriteTeam(e.target.value)
  }

  function saveFavorite() {
    localStorage.setItem("favorite", selectFavoriteTeam)
    setFavoriteTeam(selectFavoriteTeam)

    getMatches(selectFavoriteTeam)

    showAlert("", "Salvo com sucesso!", "success", 4000)
  }

  return (
    <Box pt="2vh" mb="4em" textAlign="center">
      {favoriteTeam != undefined ? (
        <>
          <Typography textAlign="center" variant="h6" color="#fff" mb="1em">
            Grupo:
          </Typography>

          {group.hasOwnProperty("teams") && <TableGroup grupo={group} indexG={0} />}

          <Typography mt="2em" textAlign="center" variant="h6" color="#fff" mb="1em">
            Partidas:
          </Typography>

          {!!matches && matches.length > 0 ?
            matches.map((match, index) => (
              <CardMatch showDate={true} key={index} match={match} />
            )
            ) : null}
        </>
      ) :
        <Box mt="30vh" display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" color="#fff" mb="1em">
            Escolha a sua seleção favorita:
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 120, '& .MuiInputLabel-root, & .MuiSelect-icon': { color: "#fff" } }}>
            <InputLabel htmlFor="grouped-select">Seleções</InputLabel>
            <Select value={selectFavoriteTeam}
              onChange={handleChange}
              sx={{ color: "#fff", '& .MuiOutlinedInput-notchedOutline': { borderColor: "#fff" } }}
              id="grouped-select"
              label="Seleções">
              {options()}
            </Select>
          </FormControl>

          <Button onClick={saveFavorite} sx={{ mt: "2em", backgroundColor: "#984B43", ':hover': { backgroundColor: "transparent" } }} variant="contained" size="large" endIcon={<Favorite />}>
            Salvar
          </Button>

        </Box>
      }
    </Box>
  )
}

export default MinhaSelecao