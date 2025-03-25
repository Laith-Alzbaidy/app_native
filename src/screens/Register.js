import React, { useState, useRef } from "react";
import { addUserToWorkoutDb, checkUser, MobileLogin } from "../config/DataApp";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  IconButton,
} from "react-native-paper";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import ColorsApp from "../config/ColorsApp";
import ProgressBar from "react-native-animated-progress"; // Import the ProgressBar component

import usePreferences from "../hooks/usePreferences";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import PhoneInput from 'react-native-phone-number-input';
const auth = getAuth();

export default function Register({ selectedValues, ...props }) {
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();
  const phoneInput = useRef(null);

  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");  // Raw input
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(""); // Formatted


  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  function generateRandomEmail() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const domainExtensions = ["com", "net", "org", "edu"];
    
    function getRandomString(length) {
      return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    }
  
    const username = getRandomString(8); // 8-character username
    const domain = getRandomString(5); // 5-character domain
    const extension = domainExtensions[Math.floor(Math.random() * domainExtensions.length)];
    
    return `${username}@${domain}.${extension}`;
  }

  function generateRandomPassword(length = 20) {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "@";
  
    const allCharacters = upperCase + lowerCase + numbers + specialCharacters;
  
    // Ensure the password has at least one of each character type
    const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];
    const password = [
      getRandomChar(upperCase),
      getRandomChar(lowerCase),
      getRandomChar(numbers),
      getRandomChar(specialCharacters),
    ];
  
    // Fill the rest of the password length with random characters
    while (password.length < length) {
      password.push(getRandomChar(allCharacters));
    }
  
    // Shuffle the password to randomize character order
    return password.sort(() => Math.random() - 0.5).join('');
  }


  const register = async () => {
    setLoading(true);
    const ss = {
      pass: generateRandomPassword(),
      email: generateRandomEmail()
    }
    if (formattedPhoneNumber && checked) {
      console.log(formattedPhoneNumber)
      try {
        
        const userExist = await checkUser(formattedPhoneNumber)
        const response = await createUserWithEmailAndPassword(
          auth,
          ss.email,
          ss.pass
        );
        
        const user = response.user;
        
        auth.signOut().then((x)=>{
          console.log('sth sth syh')
          // await updateProfile(user, {
            //   displayName: phone,
            // });
            
            const userJson = {
            user_id: user.uid,
            user_name: formattedPhoneNumber,
            user_email: user.email,
            user_goal: JSON.stringify(selectedValues),
          };
          
          addUserToWorkoutDb(user.uid, formattedPhoneNumber, ss.pass, selectedValues, ss.email)
          MobileLogin(formattedPhoneNumber).then((x)=>{
            console.log('wekfnergjnroinroinb;ldskvlkdojbnronb')
            props.navigation.navigate('OTP', { phone: formattedPhoneNumber });
          });
        });
       
       
        
      } catch (error) {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          Alert.alert(Strings.ST104, Strings.ST36);
        } else {
          Alert.alert(Strings.ST104, Strings.ST36);
        }
      }
    } else {
      setLoading(false);
      Alert.alert(Strings.ST104, Strings.ST33);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
      <View style={[Styles.AuthPage,{marginTop:10}]}>
        <View style={{ paddingHorizontal: 20 }}>
          <ProgressBar
            progress={100}
            height={5}
            backgroundColor={ColorsApp.PRIMARY}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
        <View
            style={{
              display: "flex",
              marginVertical: 2,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ marginBottom: 5, fontSize: 20 }}>28/28 </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ><Text style={{ marginBottom: 5, fontSize: 20 }}>{Strings.ST11}</Text></View>
        </View>
        <View style={Styles.AuthContent}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Image
              source={require("../../assets/mt-logo.png")}
              style={{ width: 120, height: 120 }}
            />
            <Text
              style={{ alignSelf: "center", fontSize: 16, textAlign: "center" }}
            >
              {Strings.ST140}
            </Text>
          </View>

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

        <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Checkbox.Android
              color={ColorsApp.PRIMARY}
              uncheckedColor={"#b9b9b9"}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onChangeScreen("terms")}
            >
              <Text style={Styles.AuthCheckBoxLabel}>{Strings.ST14}</Text>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            dark={theme === "dark" ? false : true}
            onPress={() => register()}
            style={Styles.AuthButton}
            contentStyle={Styles.AuthButtonContent}
          >
            {!loading ? Strings.ST17 : Strings.ST31}
          </Button>

          <View style={Styles.AuthBottomContent}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onChangeScreen("login")}
            >
              <Text style={Styles.AuthBottomText}>
                {Strings.ST13}{" "}
                <Text style={{ fontWeight: "bold" }}>{Strings.ST34}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
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