import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    if (!token || !role) {
      return navigation.replace("Login");
    }

    switch (role) {
      case "user_dinas":
        navigation.replace("DinasTabs");
        break;
      case "verifikator_dinas":
        navigation.replace("VerifierTabs");
        break;
      case "diskominfo":
        navigation.replace("DiskominfoTabs");
        break;
      case "auditor":
        navigation.replace("AuditorTabs");
        break;
      default:
        navigation.replace("Login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default AuthLoadingScreen;
