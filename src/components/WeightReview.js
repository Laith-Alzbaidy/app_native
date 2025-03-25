import React, { useRef, useState,useEffect } from "react";
import { View, ImageBackground, Image, TouchableOpacity,TouchableWithoutFeedback ,Keyboard} from "react-native";
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
export default function TwentiethsSixComponent({ selectedValues,onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOption, setSelectedOption] = useState(0);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [inputValue, setInputValue] = useState('');
  const [wrongValue, setWrongValue] = useState(false);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100; // convert height from cm to meters
      const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
      setBmi(bmiValue);
      onSelectValue("bmi", bmiValue); // Pass the array to onSelectValue

    }
    else{
      setBmi(null)
    }
}
useEffect(() => {
  calculateBMI();
}, [weight,height,bmi])


  const handleInputChange = (text) => {
    if (text) {
      const weightFloat = parseFloat(text);
      if (!isNaN(weightFloat) && weightFloat >= 25 && weightFloat <= 300) {
        setWrongValue(false);
        setWeight(text);
  
        const heightObject = selectedValues?.find(item => item.componentId === "height");
  console.log("@@")
  console.log(heightObject)
        if (heightObject) {
          const heightValue = heightObject.value;
          console.log("Height:", heightValue);
  
          setHeight(heightValue);
          calculateBMI();
        } else {
          console.log("Height not found in selectedValues array");
        }
  
        onSelectValue("weight", text); // Pass the array to onSelectValue
      } else {
        setWrongValue(true);
      }
    } else {
      setWrongValue(false);
    }
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
          progress={81}
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
          <Text style={{ marginBottom: 0, fontSize: 20 }}>6/7 </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 0, fontSize: 20, fontWeight: "800" }}>
            
            {Strings.q26}
          </Text>
        </View>
      </View>
      <View style={[Styles.Customecard, Styles.cardContent,{marginHorizontal:0,paddingHorizontal:15,justifyContent:'center'}]}>

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
            {wrongValue && (
                <Text style={{textAlign:'center',color:'red'}}>{Strings.error_weight}</Text>
              )}
      </View>
      <View style={{ display: "flex", justifyContent: "center",marginTop:30 }}>
      {!bmi && (
  <Image
    source={require("../../images/bmi1.png")}
    style={{ width: 300, height: 150, zIndex: 545, marginVertical: 0 }}
  />
)}

{bmi && bmi < 18 && (
  <Image
    source={require("../../images/bmi2.png")}
    style={{ width: 300, height: 150, zIndex: 545, marginVertical: 0 }}
  />
)}

{bmi >= 18 && bmi <= 40 && (
  <Image
    source={require("../../images/bmi1.png")}
    style={{ width: 300, height: 150, zIndex: 545, marginVertical: 0 }}
  />
)}

{bmi > 40 && (
  <Image
    source={require("../../images/bmi3.png")}
    style={{ width: 300, height: 150, zIndex: 545, marginVertical: 0 }}
  />
)}


      </View>
{bmi && 
 <Text style={{fontSize: 24,
  fontWeight: 'bold',
  color: ColorsApp.PRIMARY,marginTop:50}}>{bmi}</Text>
}     
      </View>
      </TouchableWithoutFeedback>

<View style={Styles.containerButton2}>
        <Grid>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
             
             icon={language=='ar' ? "arrow-right-bold" : "arrow-left-bold"}
             disabled={false}
              mode='text'
              onPress={() => onChangeScreen("HightReview")}     
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
                          disabled={(inputValue=="" || wrongValue)}

              icon={language=='ar' ? "arrow-left-bold" : "arrow-right-bold"}
              mode='contained'
              onPress={() => onChangeScreen("FoodReview")}     
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
