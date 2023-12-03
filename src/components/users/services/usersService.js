import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl, headers());
  return response.data;
};

const headers = () => {
  const { token } = JSON.parse(window.localStorage.getItem("user"));
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default {
  getAll,
};
