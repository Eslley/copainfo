import axios from "axios";

export const http = axios.create({
    baseURL: 'http://api.cup2022.ir/api/v1/'
})

http.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc5YjBjNmZkOWFhYzIyNjc2MThjNTgiLCJpYXQiOjE2Njg5Mjk5MjgsImV4cCI6MTY2OTAxNjMyOH0.2dsCUcMv3ivJzqfOW0C_FOadGwcQlonYJF779xPbHK4'
http.defaults.headers.common['Content-Type'] = 'application/json'