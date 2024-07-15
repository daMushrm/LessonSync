import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const DeveloperProfileScreen = () => {
  const openGitHub = () => {
    Linking.openURL("https://github.com/daMushrm");
  };

  const openLinkedIn = () => {
    Linking.openURL("https://www.linkedin.com/in/OmarMHasan");
  };

  const openEmail = () => {
    Linking.openURL("mailto:omarmhasan@proton.me");
  };

  const openSupport = () => {
    Linking.openURL("https://buymeacoffee.com/omarmhasan");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.linkContainer} onPress={openGitHub}>
          <Ionicons name="logo-github" size={24} color="#000" />
          <Text style={styles.linkText}>@daMushrm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={openLinkedIn}>
          <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
          <Text style={[styles.linkText, { color: "#0077B5" }]}>
            OmarMHasan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={openEmail}>
          <Ionicons name="mail" size={24} color="#6D4BFF" />
          <Text style={[styles.linkText, { color: "#6D4BFF" }]}>
            OmarMHasan@proton.me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={openSupport}>
          <FontAwesome name="money" size={24} color="#FF8000" />
          <Text style={[styles.linkText, { color: "#FF8000" }]}>
            Support Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  linkText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default DeveloperProfileScreen;
