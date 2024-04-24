import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  let response;

  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signup = async (data) => {
  let response;

  try {
    response = await api.post("/signup", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const logout = async () => {
  let response;

  try{
    response = await(api.post("/logout"));
  }
  catch(error){
    return error;
  }

  return response;
}

export const registerStadium = async(data) => {
  let response;

  try {
    response = await(api.post("/stadium/register", data));
    
  } catch (error) {
    return error;
  }

  return response;
} 

export const updateStadium = async(data) => {
  let response;

  try {
    response = await(api.post("/stadium/update", data));
    
  } catch (error) {
    return error;
  }

  return response;
} 

export const getStadiums = async() => {
  let response;

  try {
    response = await(api.get("/stadium/all"));
    
  } catch (error) {
    return error;
  }

  return response;
}
