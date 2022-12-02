import DateTitle from "../../components/layout/date-title/DateTitle"
import EmptyState from "../../components/layout/empty/EmptyState"
import CardMatch from "../days-games/CardMatch"

function Eighths({ eighths }) {
    return (
        <>
            {Object.keys(eighths).length !== 0 ? (

                Object.keys(eighths).map((date, indexD) => (
                    <div key={indexD}>

                        <DateTitle date={date} />

                        {eighths[date].map((match, indexM) => (
                            <CardMatch key={indexD + "" + indexM} match={match} />
                        ))}
                    </div>
                ))

            ) : <EmptyState message="Sem informações no momento!" />}
        </>
    )
}

export default Eighths