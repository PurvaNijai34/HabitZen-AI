import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios.js";

const AuthContext =
  createContext(null);

export const useAuth = () =>
  useContext(AuthContext);

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(() => {
      const raw =
        localStorage.getItem(
          "user"
        );

      return raw
        ? JSON.parse(raw)
        : null;
    });

  const [loading, setLoading] =
    useState(true);

  // Check auth on refresh

  useEffect(() => {
    api
      .get("/auth/me")

      .then((res) => {
        setUser(res.data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );
      })

      .catch(() => {
        localStorage.removeItem(
          "user"
        );

        setUser(null);
      })

      .finally(() =>
        setLoading(false)
      );
  }, []);

  // LOGIN

  const login = async (
    email,
    password
  ) => {
    const res = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        res.data.user
      )
    );

    setUser(res.data.user);

    return res.data.user;
  };

  // REGISTER

  const register = async (
    name,
    email,
    password
  ) => {
    const res = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        res.data.user
      )
    );

    setUser(res.data.user);

    return res.data.user;
  };

  // LOGOUT

  const logout = async () => {
    try {
      await api.post(
        "/auth/logout"
      );
    } catch {}

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  // FORGOT PASSWORD

  const forgotPassword =
    async (email) => {
      const res = await api.post(
        "/auth/forgot-password",
        { email }
      );

      return res.data;
    };

  // RESET PASSWORD

  const resetPassword =
    async (
      token,
      password
    ) => {
      const res = await api.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      return res.data;
    };

  // UPDATE USER

  const updateUser = (u) => {
    setUser(u);

    localStorage.setItem(
      "user",
      JSON.stringify(u)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        login,
        register,
        logout,

        updateUser,

        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};