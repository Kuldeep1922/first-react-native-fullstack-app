import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({ user: null, token: "" });

  const loadLocalStorageData = async () => {
    try {
      const data = await AsyncStorage.getItem("@auth");
      if (data) {
        const parsedData = JSON.parse(data);
        setState({
          token: parsedData?.token || "",
          user: parsedData?.user || null,
        });
      }
    } catch (error) {
      console.error("Error loading data from AsyncStorage:", error);
    }
  };

  axios.defaults.baseURL = "http://10.0.2.2:8080/api/v1"
  

  useEffect(() => {
    loadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the provider for usage in other components
export { AuthProvider };
