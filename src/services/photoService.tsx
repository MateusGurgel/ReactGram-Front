import {api, requestConfig} from "../utils/config"

const publishPhoto = async (data: any, token: string) => {
    const config = requestConfig("POST", data, token, true);
  
    try {
      const res = await fetch(api + "/photos", config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

const photoService = { publishPhoto }

export default photoService