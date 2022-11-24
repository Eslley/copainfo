import { AppBar, Box, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import { useLoader } from "../../components/loading/LoadingProvider"
import matchService from "../../providers/http-services/match"
import SwipeableViews from 'react-swipeable-views';
import TabPanel from "../../components/layout/tabs/TabPanel"
import moment from "moment/moment"
import CardMatch from "./CardMatch"
import EmptyState from '../../components/layout/empty/EmptyState'
import findGroup from "../../providers/utils/groups"

var matchesData = []

const today = moment()
const yesterday = moment().subtract(1, 'days')
const tomorrow = moment().add(1, 'days')

matchService.matchesByDate(yesterday.format('YYYY-MM-DD'), tomorrow.format('YYYY-MM-DD'))
  .then(res => {
    if (res.status === 200) {
      matchesData = res.data
      matchesData.forEach(match => {
        if (match.stage_name === "First stage") {
          const matchGroup = findGroup(match.home_team.country).group

          match.group = matchGroup
        }
      });
    }
  })
  .catch(err => {
    console.log(err)
  })

function DaysGames() {

  const [matchesToday, setMatchesToday] = useState([])
  const [matchesTomorrow, setMatchesTomorrow] = useState([])
  const [matchesYesterday, setMatchesYesterday] = useState([])

  const [tabValue, setTabValue] = useState(1)

  const { showAlert } = useAlertMessage()

  const { startLoader, stopLoader } = useLoader()

  useEffect(() => {
    startLoader()

    let aux = matchesData.filter(match => {
      return moment(match.datetime).format('YYYY-MM-DD') === today.format('YYYY-MM-DD')
    })

    setMatchesToday(aux)

    aux = matchesData.filter(match => {
      return moment(match.datetime).format('YYYY-MM-DD') === yesterday.format('YYYY-MM-DD')
    })

    setMatchesYesterday(aux)

    aux = matchesData.filter(match => {
      return moment(match.datetime).format('YYYY-MM-DD') === tomorrow.format('YYYY-MM-DD')
    })

    setMatchesTomorrow(aux)

    stopLoader()

  }, [matchesData])

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabValue(index);
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ color: "#fff", mb: "2em" }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{ '& .MuiTabs-indicator': { backgroundColor: "#984B43" } }}
        variant="fullWidth"
        textColor="primary.light"
      >
        <Tab label="Ontem" {...a11yProps(0)} />
        <Tab label="Hoje" {...a11yProps(0)} />
        <Tab label="Amanhã" {...a11yProps(0)} />
      </Tabs>
      <SwipeableViews
        index={tabValue}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabValue} index={0}>
          {!!matchesYesterday && matchesYesterday.length > 0 ? (
            matchesYesterday.map((match, index) => (

              <CardMatch key={index} match={match} />

            ))
          ) : (
            <EmptyState message="Sem informações no momento!" />
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>

          {!!matchesToday && matchesToday.length > 0 ? (
            matchesToday.map((match, index) => (

              <CardMatch key={index} match={match} />

            ))
          ) : (
            <EmptyState message="Sem informações no momento!" />
          )}

        </TabPanel>

        <TabPanel value={tabValue} index={2}>

          {!!matchesTomorrow && matchesTomorrow.length > 0 ? (
            matchesTomorrow.map((match, index) => (

              <CardMatch key={index} match={match} />

            ))
          ) : (
            <EmptyState message="Sem informações no momento!" />
          )}

        </TabPanel>

      </SwipeableViews>
    </Box>
  )
}

export default DaysGames