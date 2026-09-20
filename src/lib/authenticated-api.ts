import axios from "axios";

const LOCAL_SESSION_KEYS = [
  "authToken",
  "farmerId",
  "farmId",
  "farmName",
  "controlDate",
  "newControl",
  "controlDateList",
] as const;

let isRedirectingToLogin = false;

const authenticatedApi = axios.create();

authenticatedApi.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      typeof window !== "undefined" &&
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      LOCAL_SESSION_KEYS.forEach((key) => localStorage.removeItem(key));
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default authenticatedApi;
