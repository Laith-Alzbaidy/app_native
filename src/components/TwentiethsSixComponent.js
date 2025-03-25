import React, { useRef, useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ColorsApp from "../config/ColorsApp";
import Styles from "../config/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, Button } from "react-native-paper";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import ProgressBar from "react-native-animated-progress"; // Import the ProgressBar component
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { useFocusEffect } from "@react-navigation/native";

export default function TwentiethsSixComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setIsLoaded(true);
    }, [])
  );
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOption, setSelectedOption] = useState(0);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [inputValue, setInputValue] = useState("");
  const [wrongValue, setWrongValue] = useState(false);

  const handleInputChange = (text) => {
    if(text){
      if(parseInt(text) >= 80 && parseInt(text) <= 250){
        setWrongValue(false)
        onSelectValue("height",text); // Pass the array to onSelectValue

      }else{
        setWrongValue(true)
      }
    }else{
      setWrongValue(false)

    }
    setInputValue(text);
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (isLoaded) {
    return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={Styles.componentContainer}>
            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <ProgressBar
                progress={78}
                height={5}
                backgroundColor={ColorsApp.PRIMARY}
              />

              <View
                style={{
                  display: "flex",
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ marginBottom: 0, fontSize: 20 }}>24/28 </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginBottom: 0,
                    fontSize: 20,
                    fontWeight: "800",
                  }}
                >
                  {Strings.q25}
                </Text>
              </View>
            </View>
            <View
              style={[
                Styles.Customecard,
                Styles.cardContent,
                {
                  marginHorizontal: 0,
                  paddingHorizontal: 15,
                  justifyContent: "center",
                },
              ]}
            >
              <TextInput
                mode="outlined"
                style={[
                  Styles.AuthInput,
                  { textAlign: "center" }, // Align placeholder text in the center
                ]}
                value={inputValue}
                placeholder={Strings.tall}
                onChangeText={handleInputChange}
                keyboardType="numeric"
              />
              {wrongValue && (
                <Text style={{textAlign:'center',color:'red'}}>{Strings.error_hight}</Text>
              )}
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 0,
              }}
            >
              <Image
                source={require("../../images/tall2.png")}
                style={{ width: 270, height: 420, zIndex: 545, marginVertical: 0 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={Styles.containerButton2}>
          <Grid>
            <Col style={{ justifyContent: "center", alignItems: "center" }}>
              <Button
                icon={language == "ar" ? "arrow-right-bold" : "arrow-left-bold"}
                disabled={false}
                mode="text"
                onPress={() => onChangeScreen("TwentiethFiveComponent")}
                labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                contentStyle={{ width: "100%" }}
                style={{
                  elevation: 0,
                  borderRadius: 100,
                  margin: 6,
                }}
              >
                {Strings.ST127}
              </Button>
            </Col>

            <Col style={{ justifyContent: "center", alignItems: "center" }}>
              <Button
                disabled={inputValue == "" || wrongValue}

                icon={language == "ar" ? "arrow-left-bold" : "arrow-right-bold"}
                mode="contained"
                onPress={() => onChangeScreen("TwentiethSevenComponent")}
                labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                contentStyle={{ width: "100%", flexDirection: "row-reverse" }}
                style={{
                  elevation: 0,
                  borderRadius: 100,
                  margin: 6,
                }}
              >
                {Strings.ST128}
              </Button>
            </Col>
          </Grid>
        </View>
        </>
    );
  } else {
    return null; // Return an appropriate placeholder or loading screen when not loaded
  }
}
