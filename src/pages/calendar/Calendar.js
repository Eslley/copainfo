import { Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLoader } from "../../components/loading/LoadingProvider"
import matchServices from "../../providers/http-services/match"
import TabPanel from "../../components/layout/tabs/TabPanel"
import SwipeableViews from "react-swipeable-views"

import findGroup from "../../providers/utils/groups"
import FirstStage from "./FirstStage"
import FabFilter from "./FabFilter"
import ModalSelectDate from "./ModalSelectDate"

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

  const [ dateFilter, setDateFilter ] = useState('');

  const handleChangeSelect = (event) => {
    setDateFilter(event.target.value);
  }

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
          <FirstStage firstStage={calendar["First stage"]} />
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

      <FabFilter tabValue={tabValue} setDateFilter={setDateFilter} />

      <ModalSelectDate open={dateFilter} setOpen={setDateFilter} dates={Object.keys(calendar["First stage"])} />

    </Box>
  )
}

export default Calendar