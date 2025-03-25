import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Image,
  TextInput as RNTextInput,
} from "react-native";
import { Text, Button } from "react-native-paper";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import usePreferences from "../hooks/usePreferences";
import { VerifyOTP } from "../config/DataApp";

const auth = getAuth();

export default function Login(props) {
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputFocus = (index) => {
    // Move the focus to the first empty field when any box is tapped
    for (let i = 0; i <= index; i++) {
      if (otp[i] === "") {
        inputRefs.current[i].focus();
        break;
      }
    }
  };

  const login = async () => {
    setLoading(true);
    const code = otp.join("");
    console.log(code)
    if (code.length === 6) {
      try {
        const response = await VerifyOTP(code, props.route.params.phone);
        console.log(response)
        if (response.id) {
          await signInWithEmailAndPassword(auth, response.email, response.pass)
            .then(() => {
              // Login success
            })
            .catch((error) => {
              const errorCode = error.code;

              if (errorCode === "auth/wrong-password") {
                Alert.alert(Strings.ST113);
              } else if (errorCode === "auth/user-not-found") {
                Alert.alert(Strings.ST37);
              } else {
                Alert.alert(Strings.ST33);
              }
            });
        }
      } catch (error) {
        Alert.alert(Strings.ST33);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert(Strings.ST33);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ justifyContent: "center", marginTop: 100 }}>
      <Text
        style={{
          marginVertical: 10,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        التحقق من رقم الهاتف
      </Text>
      <Image
        source={require("../../assets/mt-logo.png")}
        resizeMode={"contain"}
        style={Styles.AuthLogo}
      />

      <View style={Styles.AuthContent}>
        <View style={{ flexDirection: "row-reverse",direction: 'ltr', justifyContent: "center", marginVertical: 20 }}>
          {otp.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onFocus={() => handleInputFocus(index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(digit, index);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              style={{
                width: 40,
                height: 40,
                marginHorizontal: 5,
                textAlign: "center",
                fontSize: 18,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              }}
            />
          ))}
        </View>

        <Button
          mode="contained"
          onPress={() => login()}
          dark={theme === "dark" ? false : true}
          style={Styles.AuthButton}
          contentStyle={Styles.AuthButtonContent}
          labelStyle={Styles.AuthButtonLabel}
        >
          {!loading ? Strings.ST17 : Strings.ST31}
        </Button>

        <View style={Styles.AuthBottomContent}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.navigate("FirstComponent")}
          >
            <Text style={Styles.AuthBottomText}>
              {Strings.ST12} <Text style={{ fontWeight: "bold" }}>{Strings.ST35}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
