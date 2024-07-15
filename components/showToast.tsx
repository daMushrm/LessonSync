import Toast from "react-native-toast-message";

const showToast = (msg: string, type: string = "success") => {
  Toast.show({
    type: type,
    text1: msg,
    position: "top",
    text1Style: {
      fontSize: 18,
      fontWeight: "normal",
    },
  });
};

export default showToast;
