"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { IUser } from "@/types/interfaces";
import { IUserContextType } from "@/types/interfaces";

const UserContext = createContext<IUserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (storedUsername && storedUserId && storedToken) {
      const user: IUser = {
        id: Number(storedUserId),
        name: storedUsername,
        email: "",
        address: "",
        phone: "",
        password: ""
      };
      setUserData(user);
      setToken(storedToken);
    }
  }, []);

  const updateUserData = (userData: IUser | null, token: string | null) => {
    setUserData(userData);
    setToken(token);
    if (userData && token) {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, token, setUserData: updateUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
