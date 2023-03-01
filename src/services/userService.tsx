import { api, requestConfig } from "../utils/config";

const profile = async (data: any, token: string) => {

    const config = requestConfig("GET", data, token);
  
    try {
      const res = await fetch(api + "/users/profile", config)
        .then((res) => res.json())
        .catch((err) => err);
    
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const userService = {
    profile
  }