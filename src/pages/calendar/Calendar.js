import { Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLoader } from "../../components/loading/LoadingProvider"
import matchServices from "../../providers/http-services/match"
import TabPanel from "../../components/layout/tabs/TabPanel"
import SwipeableViews from "react-swipeable-views"
import EmptyState from "../../components/layout/empty/EmptyState"
import CardMatch from "../days-games/CardMatch"
import findGroup from "../../providers/utils/groups"
import { Event } from "@mui/icons-material"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const defaultCalendar = {
  "Final": [],
  "Play-off for third place": [],
  "Semi-final": [],
  "Quarter-final": [],
  "Round of 16": [],
  "First stage": {} // the matches are grouped by date
}

function Calendar() {

  const [calendar, setCalendar] = useState(defaultCalendar)
  const [tabValue, setTabValue] = useState(0)
  const { startLoader, stopLoader } = useLoader()

  useEffect(() => {
    startLoader()

    matchServices.allMatches()
      .then(res => {
        if (res.status === 200) {
          let data = res.data
          data.forEach(match => {
            if (match.stage_name === "First stage") {
              match.date = moment(match.datetime).format("YYYY-MM-DD")

              const matchGroup = findGroup(match.home_team.country).group

              match.group = matchGroup
            }
          })

          // group the matches by stage
          let calendar = groupBy(data, "stage_name")

          // group by date in first stage
          calendar["First stage"] = groupBy(calendar["First stage"], "date")

          console.log(calendar)
          setCalendar(calendar)
        }

        stopLoader()
      })
      .catch(err => {
        stopLoader()
      })
  }, [])

  function groupBy(array, key) {
    return array
      .reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
      }, {})
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  }

  const handleChangeIndex = (index) => {
    setTabValue(index);
  }

  return (
    <Box sx={{ color: "#fff", mb: "2em" }}>

      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        sx={{ '& .MuiTabs-indicator': { backgroundColor: "#984B43" }, '& .MuiTabs-flexContainer': { justifyContent: { md: "center" } } }}
        textColor="inherit"
        allowScrollButtonsMobile>
        <Tab label="Fase de Grupos" {...a11yProps(0)} />
        <Tab label="Oitavas" {...a11yProps(1)} />
        <Tab label="Quartas" {...a11yProps(2)} />
        <Tab label="Semi" {...a11yProps(3)} />
        <Tab label="Final" {...a11yProps(4)} />
      </Tabs>

      <SwipeableViews
        index={tabValue}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={tabValue} index={0}>
          {Object.keys(calendar["First stage"]).length !== 0 ? (

            Object.keys(calendar["First stage"]).map((date, indexD) => (
              <div key={indexD}>

                <Box bgcolor="#984B43" borderRadius="5px" p="0.3em" display="flex" justifyContent="center" alignItems="center" columnGap="0.5em" mt="2em" mb="1em">
                  <Event />
                  <Typography variant="h6" >
                    {moment(date).format("ll")}
                  </Typography>
                </Box>

                {calendar["First stage"][date].map((match, indexM) => (
                  <CardMatch key={indexD + "" + indexM} showDate match={match} />
                ))}
              </div>
            ))

          ) : <EmptyState message="Sem informações no momento!" />}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          Oitavas
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          Quartas
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          Semi
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          Final
        </TabPanel>

      </SwipeableViews>
    </Box>
  )
}

export default Calendar