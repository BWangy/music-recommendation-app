import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UseAuthCode = string | null;

export default function useAuth(code: UseAuthCode) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;

    axios
      .post(`${apiURL}/login`, {
        code,
      })
      .then((res) => {
        console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        /* navigate("/dashboard"); */
      })
      .catch(() => {
        navigate("/");
      });
  }, [code]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;

    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${apiURL}/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((error) => {
          console.log(error);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
