import { Linking, Alert } from "react-native";

const openWhatsApp = (phoneNumber: string, message: string) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  try {
    Linking.openURL(url);
  } catch (error) {
    Alert.alert(
      "Error",
      "WhatsApp is not installed on your device",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
};

export default openWhatsApp;
