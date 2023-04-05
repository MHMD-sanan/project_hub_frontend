import axios from "../api/developer";
import { useStateContext } from "../contexts/ContextProvider";

const useRefreshToken = () => {
  const { setLoggedDeveloper } = useStateContext();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    // eslint-disable-next-line arrow-body-style
    setLoggedDeveloper((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
