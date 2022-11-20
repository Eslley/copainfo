import { http } from './http'

export default {

    allTeams:() => {
        return http.get('teams')
    }
}