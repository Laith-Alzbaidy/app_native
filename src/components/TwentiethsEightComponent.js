import React, { useRef, useState } from "react";
import { View, ImageBackground, Image, TouchableOpacity,TouchableWithoutFeedback,Keyboard } from "react-native";
import ColorsApp from "../config/ColorsApp";
import Styles from "../config/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput,Button} from "react-native-paper";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import ProgressBar from "react-native-animated-progress"; // Import the ProgressBar component
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
export default function TwentiethsEightComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOption, setSelectedOption] = useState(0);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  
 

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={Styles.componentContainer}>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <ProgressBar
          progress={84}
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
          <Text style={{ marginBottom: 20, fontSize: 20 }}>26/28 </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: "800" }}>
            
            {Strings.q27}
          </Text>
        </View>
      </View>

      <View style={{ display: "flex", justifyContent: "center",marginTop:10 }}>
    
     <TextInput
              mode="outlined"
              style={[
                Styles.AuthInput,
                { textAlign: "center" }, // Align placeholder text in the center
              ]}
              value={inputValue}
              placeholder={Strings.weight}
              onChangeText={handleInputChange}
              keyboardType="numeric"
            />

        <Image
          source={require("../../images/body.png")}
          style={{ width: 270, height: 360 }}
        />
      </View>
      <View style={[Styles.Customecard, Styles.cardContent,{marginHorizontal:10,paddingHorizontal:15,justifyContent:'center'}]}>


      </View>
      </View>
      </TouchableWithoutFeedback>

<View style={Styles.containerButton2}>
        <Grid>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
             
             icon={language=='ar' ? "arrow-right-bold" : "arrow-left-bold"}
             disabled={false}
              mode='text'
              onPress={() => onChangeScreen("TwentiethSevenComponent")}     
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
                          disabled={(inputValue=="")}

              icon={language=='ar' ? "arrow-left-bold" : "arrow-right-bold"}
              mode='contained'
              onPress={() => onChangeScreen("TwentiethNineComponent")}     
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
}
