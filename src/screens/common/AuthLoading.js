import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthLoading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");

      if (!token || !role) {
        return navigation.replace("Login");
      }

      switch (role) {
        case "user_dinas":
          return navigation.replace("DinasTabs");
        case "verifikator_dinas":
          return navigation.replace("VerifierTabs");
        case "diskominfo":
          return navigation.replace("DiskominfoTabs");
        case "auditor":
          return navigation.replace("AuditorTabs");
        default:
          return navigation.replace("Login");
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0057FF" />
    </View>
  );
};

export default AuthLoading;
