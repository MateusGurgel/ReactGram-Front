import {api, requestConfig} from '../utils/config'

const register = async(data : any) => {

    const config = requestConfig("POST", data)

    console.log(config)

    try{
        const res = await fetch(api + "/users/register", config)
        .then((res) => res.json())
        .catch((err) => err);

        if(res) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res;
    } catch (error) {
        console.log(error)
    }

}

const authService = {
    register
}

export default authService