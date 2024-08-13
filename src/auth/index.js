// isLoggedIn =>
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};
// doLogin=> set to localstorage

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// doLogout=> remove from localstorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// get currentUser

export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data"));
    // return JSON.parse(localStorage.getItem("data"))?.user;
  } else {
    return false;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};
