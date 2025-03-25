import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Text, Button } from "react-native-paper";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { getAuth } from "firebase/auth";
import usePreferences from "../hooks/usePreferences";
import { MobileLogin } from "../config/DataApp";
import PhoneInput from 'react-native-phone-number-input';

const auth = getAuth();

export default function Login(props) {
  const { language } = React.useContext(LanguageContext);
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();
  const phoneInput = useRef(null);

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");  // Raw input
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(""); // Formatted

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const login = async () => {
    setLoading(true);
    if (!formattedPhoneNumber) { // Check if phone number is entered
      setLoading(false);
      Alert.alert(Strings.ST33 || "Please enter a phone number"); // Provide a default message if ST33 is not defined
      return;
    }

    try {
      const response = await MobileLogin(formattedPhoneNumber);
      if (response.id) { // Check for a successful response, assuming 'id' signifies success
        props.navigation.navigate('OTP', { phone: formattedPhoneNumber });
      } else {
        // Handle other response cases or errors as needed, e.g., display a message from the response
        Alert.alert(Strings.ST33 || "Login failed. Please try again."); // Default message if needed
      }
    } catch (error) {
      console.error("Login error:", error); 
      Alert.alert(Strings.ST33 || "An error occurred during login."); // User-friendly error message
    } finally {
      setLoading(false); // Ensure loading state is reset in all cases
    }
  };




  return (
    <SafeAreaView style={{ justifyContent: "center", marginTop: 100 }}>
      <Text style={styles.title}>{Strings.ST10}</Text>
      <Image source={require("../../assets/mt-logo.png")} resizeMode="contain" style={Styles.AuthLogo} />

      <View style={Styles.AuthContent}>
        <PhoneInput
        
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="JO"
          layout="first"
          flagButtonStyle={styles.flagButton}
          onChangeText={setPhoneNumber}
          onChangeFormattedText={setFormattedPhoneNumber}
          withDarkTheme={theme === "dark"}
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={styles.phoneInputTextContainer}
          textInputStyle={styles.phoneInputTextInput}
          codeTextStyle={styles.phoneInputCodeText}
        />

        <Button
          mode="contained"
          onPress={login}
          dark={theme === "dark" ? false : true}
          style={Styles.AuthButton}
          contentStyle={Styles.AuthButtonContent}
          labelStyle={Styles.AuthButtonLabel}
          loading={loading}
        >
          {loading ? Strings.ST31 : Strings.ST17}
        </Button>


        <View style={Styles.AuthBottomContent}>
          <TouchableOpacity onPress={() => onChangeScreen("FirstComponent")}>
            <Text style={Styles.AuthBottomText}>
              {Strings.ST12} <Text style={{ fontWeight: "bold" }}>{Strings.ST35}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  title: {  // Style for the title text
    marginVertical: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  phoneInputContainer: {
    marginBottom: 16,
    backgroundColor: 'transparent',
    flexDirection: "row-reverse"
  },
  flagButton:{
    padding: 0,
    flexDirection: 'row-reverse'
  },
  phoneInputTextContainer: { backgroundColor: 'transparent', flexDirection: 'row-reverse', paddingStart: 0},
  phoneInputTextInput: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  phoneInputCodeText: { fontSize: 16 },

});