import axios from "./axios";

const useRefreshToken = () => {
  const user =
    typeof Storage === "undefined"
      ? {}
      : JSON.parse(localStorage.getItem("user") || "{}");
      
  const refresh = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user?.tokens.refreshToken}`;
    const response = await axios.get("/auth/refresh");
    const newUser = localStorage.setItem(
      "user",
      JSON.stringify(response?.data)
    );
    return newUser;
  };
  return refresh;
};

export default useRefreshToken;
