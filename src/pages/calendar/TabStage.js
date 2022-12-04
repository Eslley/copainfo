import moment from "moment"
import DateTitle from "../../components/layout/date-title/DateTitle"
import EmptyState from "../../components/layout/empty/EmptyState"
import CardMatch from "../days-games/CardMatch"

function TabStage({ stage, setTabIndex=false }) {
    return (
        <>
            {Object.keys(stage).length !== 0 ? (

                Object.keys(stage).map((date, indexD) => (
                    <div id={setTabIndex ? moment(date).format("MM-DD") : null} tabIndex={setTabIndex ? indexD: null} key={indexD}>

                        <DateTitle date={date} />

                        {stage[date].map((match, indexM) => (
                            <CardMatch key={indexD + "" + indexM} match={match} />
                        ))}
                    </div>
                ))

            ) : <EmptyState message="Sem informações no momento!" />}
        </>
    )
}

export default TabStage