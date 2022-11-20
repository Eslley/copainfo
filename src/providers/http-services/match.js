import { http } from './http'

export default {

    matchByDate:(date) => {
        return http.post('bydate', { date: date })
    },

    allMatches:() => {
        return http.get('match')
    },

}