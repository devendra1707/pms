import { myAxios, privateAxios } from "./helper";

export const signUpUser = (user, id) => {
  return myAxios
    .post(`api/register?rId=${id}`, user)
    .then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("auth/login", loginDetail)
    .then((response) => response.data);
};

export const getCurrentUser = () => {
  return privateAxios.get(`api/current-user`).then((response) => {
    return response.data;
  });
};

export const apiCallAgain = () => {
  return myAxios.get("api/").then((res) => res.data);
};


