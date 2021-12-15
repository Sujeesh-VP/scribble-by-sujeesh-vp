const setToLocalStorage = ({ authToken, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authSiteName", JSON.stringify(userName));
};
const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = localStorage.getItem(key);
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
