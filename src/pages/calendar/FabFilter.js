import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { DateRange, FilterAlt, KeyboardArrowUp, Today } from "@mui/icons-material"
import moment from "moment"

function FabFilter({ tabValue, setDateFilter }) {

    const goToday = () => {
        const today = moment().format("MM-DD")
        const elem = document.getElementById(today)
        if(!!elem) elem.focus()
    }

    return (
        <SpeedDial
            hidden={tabValue !== 0}
            sx={{ position: "fixed", bottom: 70, right: 24, "& .MuiSpeedDial-fab, & .MuiSpeedDial-fab:hover": { backgroundColor: "#984B43" } }}
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon icon={<KeyboardArrowUp />} openIcon={<FilterAlt />} />}
        >
            <SpeedDialAction
                key="0"
                icon={<DateRange />}
                tooltipTitle="Filtrar por data"
                onClick={() => setDateFilter(true)}
            />
            <SpeedDialAction
                disabled={moment().isAfter(moment('2022-12-02'))}
                key="1"
                icon={<Today />}
                tooltipTitle="Ir para hoje"
                onClick={goToday}
            />
        </SpeedDial>
    )
}

export default FabFilter