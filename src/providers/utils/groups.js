export const Groups = [
    {
        group: "A",
        teams: ["SEN", "NED", "QAT", "ECU"]
    },
    {
        group: "B",
         teams: ["ENG", "IRN", "WAL", "USA"]
    },
    {
        group: "C",
         teams: ["ARG", "KSA", "MEX", "POL"]
    },
    {
        group: "D",
         teams: ["FRA", "DEN", "TUN", "AUS"]
    },
    {
        group: "E",
         teams: ["ESP", "GER", "JPN", "CRC"]
    },
    {
        group: "F",
         teams: ["BEL", "CAN", "MAR", "CRO"]
    },
    {
        group: "G",
         teams: ["BRA", "SRB", "SUI", "CMR"]
    },
    {
        group: "H",
         teams: ["POR", "GHA", "URU", "KOR"]
    },
]

export default function findGroup(team) {
    const group = Groups.find(group => group.teams.indexOf(team) !== -1)

    return group
}