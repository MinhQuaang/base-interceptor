import axiosClient from "../utils/axiosClient";

export const login = async (data) => {
  const response = await axiosClient.post("/auth/login", data);
  return response;
};

export const getUserInfo = async () => {
  const response = await axiosClient.get("/auth/profile");
  return response;
};

export const refreshTokenRequest = async (refreshToken) => {
  const response = await axiosClient.post("/auth/refresh", {
    refresh_token: refreshToken,
  });
  return response;
};
