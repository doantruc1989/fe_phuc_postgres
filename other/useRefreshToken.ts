import { useRouter } from "next/router";
import axios from "./axios";

const useRefreshToken = () => {
  const router = useRouter();
  const user =
    typeof Storage === "undefined"
      ? {}
      : JSON.parse(localStorage.getItem("user") || "{}");

  const refresh = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user?.tokens?.refreshToken}`;
    try {
      const response = await axios.get("/auth/refresh");
      const newUser = response.data;
      localStorage.setItem("user", JSON.stringify(response?.data));
      return newUser;
    } catch (error) {
      localStorage.removeItem("user");
      router.push("/");
    }
  };
  return refresh;
};

export default useRefreshToken;
