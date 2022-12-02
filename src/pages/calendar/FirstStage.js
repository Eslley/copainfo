import moment from "moment"
import DateTitle from "../../components/layout/date-title/DateTitle"
import EmptyState from "../../components/layout/empty/EmptyState"
import CardMatch from "../days-games/CardMatch"

function FirstStage({ firstStage }) {
    return (
        <>
            {Object.keys(firstStage).length !== 0 ? (

                Object.keys(firstStage).map((date, indexD) => (
                    <div id={moment(date).format("MM-DD")} tabIndex={indexD} key={indexD}>

                        <DateTitle date={date} />

                        {firstStage[date].map((match, indexM) => (
                            <CardMatch key={indexD + "" + indexM} match={match} />
                        ))}
                    </div>
                ))

            ) : <EmptyState message="Sem informações no momento!" />}
        </>
    )
}

export default FirstStage