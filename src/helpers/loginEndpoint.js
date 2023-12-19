import axios from "axios"

const urlBase='https://localhost:7203/api/';

export const LoginResponse = async(userLogin) => {
    const response = await axios.post(`${urlBase}Authorize`,userLogin);
    console.log(response);
    return response.data.data;
}

//catch para 404