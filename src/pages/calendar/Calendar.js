import { Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useEffect, useState } from "react"
import { useLoader } from "../../components/loading/LoadingProvider"
import matchServices from "../../providers/http-services/match"
import TabPanel from "../../components/layout/tabs/TabPanel"
import SwipeableViews from "react-swipeable-views"

import findGroup from "../../providers/utils/groups"
import FabFilter from "./FabFilter"
import ModalSelectDate from "./ModalSelectDate"
import TabStage from "./TabStage"

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

  const [dateFilter, setDateFilter] = useState(false);

  useEffect(() => {
    startLoader()

    changeTabByStage()

    matchServices.allMatches()
      .then(res => {
        if (res.status === 200) {
          let data = res.data
          data.forEach(match => {
            match.date = moment(match.datetime).format("YYYY-MM-DD")

            if (match.stage_name === "First stage") {
              const matchGroup = findGroup(match.home_team.country).group

              match.group = matchGroup
            }
          })

          // group the matches by stage
          let calendar = groupBy(data, "stage_name")

          // group by date
          calendar["First stage"] = groupBy(calendar["First stage"], "date")
          calendar["Round of 16"] = groupBy(calendar["Round of 16"], "date")
          calendar["Quarter-final"] = groupBy(calendar["Quarter-final"], "date")
          calendar["Semi-final"] = groupBy(calendar["Semi-final"], "date")
          calendar["Play-off for third place"] = groupBy(calendar["Play-off for third place"], "date")
          calendar["Final"] = groupBy(calendar["Final"], "date")

          setCalendar(calendar)
        }

        stopLoader()
      })
      .catch(err => {
        stopLoader()
      })
  }, [])

  function changeTabByStage() {
    let today = moment()

    if (today.isBetween(moment('2022-11-20'), moment('2022-12-02'))) // First Stage
      setTabValue(0)
    else if (today.isBetween(moment('2022-12-03'), moment('2022-12-06'))) // Round of 16
      setTabValue(1)
    else if (today.isBetween(moment('2022-12-09'), moment('2022-12-10'))) // Quarters
      setTabValue(2)
    else if (today.isBetween(moment('2022-12-13'), moment('2022-12-14'))) // Semi
      setTabValue(3)
    else if (today.isSame(moment('2022-12-17'))) // 3° Place
      setTabValue(4)
    else if (today.isSame(moment('2022-12-18'))) // Final
      setTabValue(5)
  }

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
        <Tab label="3° Lugar" {...a11yProps(4)} />
        <Tab label="Final" {...a11yProps(5)} />
      </Tabs>

      <SwipeableViews
        index={tabValue}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={tabValue} index={0}>
          <TabStage stage={calendar["First stage"]} setTabIndex={true} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TabStage stage={calendar["Round of 16"]} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TabStage stage={calendar["Quarter-final"]} />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <TabStage stage={calendar["Semi-final"]} />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <TabStage stage={calendar["Play-off for third place"]} />
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <TabStage stage={calendar["Final"]} />
        </TabPanel>

      </SwipeableViews>

      {/* Keep this component out of SwipeableViews, there's a conflict between the properties transform: translate and position: fixed */}
      {Object.keys(calendar["First stage"]).length > 0 && <FabFilter tabValue={tabValue} setDateFilter={setDateFilter} />}

      <ModalSelectDate open={dateFilter} setOpen={setDateFilter} dates={Object.keys(calendar["First stage"])} />

    </Box>
  )
}

export default Calendar