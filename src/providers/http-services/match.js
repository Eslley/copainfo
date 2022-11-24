import { http } from './http'

export default {

    matchesToday:() => {
        return http.get('matches/today')
    },

    matchesTomorrow:() => {
        return http.get('matches/tomorrow/')
    },

    matchesByDate:(start, end) => {
        return http.get(`matches?start_date=${start}&end_date=${end}`)
    },

    matchesByTeam:(team) => {
        return http.get(`matches/country/${team}`)
    }

}