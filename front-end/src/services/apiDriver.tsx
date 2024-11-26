import axios from "axios";

async function getAllDrivers() {
    const {data: res} = await axios.get('http://localhost:8080/driver')
    return res;
};

const APIDriver = {
    getAllDrivers
};

export default APIDriver;