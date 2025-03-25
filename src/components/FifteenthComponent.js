import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import ColorsApp from '../config/ColorsApp';
import Styles from "../config/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Text,Button } from "react-native-paper";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import ProgressBar from 'react-native-animated-progress'; // Import the ProgressBar component
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import ConfigApp from "../config/ConfigApp";
import { useFocusEffect } from '@react-navigation/native';
import { getFifteenthQuestion } from '../config/DataApp';
import { ScrollView } from "react-native-gesture-handler";


export default function FifteenthComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const [isLoaded,setIsLoaded]=useState(false)
  const [options,setOptions]=useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getFifteenthQuestion();
      console.log(response.aaData);
      setOptions(response.aaData);
      setIsLoaded(true);
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoaded(true)
    } 
  };
  
  useEffect(() => {
    fetchData();
  
  }, []);
  useFocusEffect(
    React.useCallback(() => {
     setIsLoaded(true);
    }, [])
  );
  const scaleValue = useRef(new Animated.Value(1)).current;
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
const [disabledbtn,setDisabledbtn]=useState(null);

  const handlePressIn = (option) => {
  
    setSelectedOptions((prevOptions) => {
      const updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter((id) => id !== option)
        : [...prevOptions, option];
  
      // Log the updated state
  
      // Pass the updated array to onSelectValue
      onSelectValue(15, updatedOptions);
  
      // Return the updated state
      return updatedOptions;
    });
  
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
if(selectedOptions[0]=="0"){
    setDisabledbtn(true)
  }else{
    setDisabledbtn(false);
  }
  
  
  }, [selectedOptions])
  
  
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const isSelected = (optionId) => selectedOptions.includes(optionId);
if(isLoaded){
  return (
    <>
 <View style={{flex:1,marginHorizontal:5,
     width: '100%',
     flex: 1, 
     marginVertical:20,
     }}>
 <View style={{ width: '100%',paddingHorizontal:20 }}>
 <ProgressBar progress={45} height={5} backgroundColor={ColorsApp.PRIMARY} />

<View style={{display:'flex',marginVertical:2,flexDirection:'row',justifyContent:'flex-end'}}>

<Text style={{ marginBottom: 5,fontSize:20 }}>15/28  </Text>


</View>
<View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Text style={{ marginBottom: 0,fontSize:16,fontWeight:'800' }}>{Strings.q14}  </Text>
</View>

    </View>
    <View style={{flex:1,justifyContent:'center',alignContent:'center',paddingLeft:20}} >
<ScrollView>
<View key={0} style={[Styles.Customecard, Styles.cardContent2]}>
        <TouchableOpacity
          disabled={!disabledbtn && selectedOptions.length>0}
          onPress={() => handlePressIn("0")}
          activeOpacity={1}
          style={[
            { transform: [{ scale: scaleValue }] },
            // Add border style when selected
            isSelected("0") ? Styles.selectedOption : null,
          ]}
        >
      <ImageBackground
              source={{ uri: 'https://img.freepik.com/free-photo/fit-young-woman-lifting-barbells-looking-focused-working-out-gym_155003-5353.jpg?t=st=1690663720~exp=1690664320~hmac=6508cfb08b5aa6cee4d81e3caeaeda09c562b42055bc514314c6497ccc9c5352' }}

        style={Styles.card5_background2}
        imageStyle={{ borderRadius: 8 }}
      >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,.3)"]}
              style={Styles.card5_gradient2}
            >
              <Row>
                <Col
                  size={100}
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Styles.optionContainer}>
                      <Text numberOfLines={2} style={Styles.card1_title3}>
                      {Strings.no_diseases}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "flex-end",marginTop:50 }}>

                      {isSelected("0")  && (

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#C65A42',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                      }}
                    >
                        <Icon name="check" size={24} color="white" />
                      
                    </View>
                    )}
                    </View>
                  </View>
                  <View style={Styles.card5_border}></View>
                </Col>
              </Row>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
{options.map((option) => (
        
        <View key={option.id} style={[Styles.Customecard, Styles.cardContent2]}>
        <TouchableOpacity
          disabled={disabledbtn}

          onPress={() => handlePressIn(option.id)}
          activeOpacity={1}
          style={[
            { transform: [{ scale: scaleValue }] },
            // Add border style when selected
            isSelected(option.id) ? Styles.selectedOption : null,
          ]}
        >
      <ImageBackground
      source={{uri:'https://appadmin.mohannad-theeb.com/images/'+option.image}}

        style={Styles.card5_background2}
        imageStyle={{ borderRadius: 8 }}
      >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,.3)"]}
              style={Styles.card5_gradient2}
            >
              <Row>
                <Col
                  size={100}
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Styles.optionContainer}>
                      <Text numberOfLines={2} style={Styles.card1_title3}>
                      {option.name}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "flex-end",marginTop:50 }}>

                      {isSelected(option.id)  && (

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#C65A42',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                      }}
                    >
                        <Icon name="check" size={24} color="white" />
                      
                    </View>
                    )}
                    </View>
                  </View>
                  <View style={Styles.card5_border}></View>
                </Col>
              </Row>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      ))}
</ScrollView>
</View>      
</View>

<View style={Styles.containerButton2}>
        <Grid>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
             
             icon={language=='ar' ? "arrow-right-bold" : "arrow-left-bold"}
             disabled={false}
              mode='text'
              onPress={() => onChangeScreen("FourteenthComponent")}     
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
                        disabled={selectedOptions.length === 0}

              icon={language=='ar' ? "arrow-left-bold" : "arrow-right-bold"}
              mode='contained'
              onPress={() => onChangeScreen("SixteenthComponent")}     
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
}