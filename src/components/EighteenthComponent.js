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
import { getEighteenthQuestion } from '../config/DataApp';
import { ScrollView } from "react-native-gesture-handler";

export default function EighthComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const [isLoaded,setIsLoaded]=useState(false)
  useFocusEffect(
    React.useCallback(() => {
     setIsLoaded(true);
    }, [])
  );
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [options,setOptions]=useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const fetchData = async () => {
    try {
      const response = await getEighteenthQuestion();
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
  const handlePressIn = (option) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter((id) => id !== option)
        : [...prevOptions, option];
  
      // Log the updated state
      console.log(updatedOptions);
  
      // Pass the updated array to onSelectValue
      onSelectValue(18, updatedOptions);
  
      // Return the updated state
      return updatedOptions;
    });
  
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

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
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <ProgressBar progress={54} height={5} backgroundColor={ColorsApp.PRIMARY} />
        <View style={{ display: 'flex', marginVertical: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{ marginBottom: 5, fontSize: 20 }}>18/28  </Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginBottom: 0, fontSize: 16, fontWeight: '800' }}>{Strings.q17}  </Text>
        </View>
      </View>
      <View style={{flex:1,justifyContent:'center',alignContent:'center',marginLeft:20}} >
<ScrollView>

{options.map((option)=>(
          <View key={option.category_id} style={[Styles.Customecard, Styles.cardContent2,{width:'90%',marginVertical:5}]}>
          <TouchableOpacity
            
            onPress={() => handlePressIn(option.category_id)}
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              isSelected(option.category_id) ? Styles.selectedOption : null,
            ]}
          >
            <ImageBackground
              source={{uri:'https://appadmin.mohannad-theeb.com/images/'+option.category_image}}
              style={Styles.card5_background2}
              imageStyle={{ borderRadius: 8,resizeMode:'cover' }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
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
                        <Text numberOfLines={2} style={Styles.card1_title2}>
                          {option.category_title}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        {isSelected(option.category_id) && (
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
              onPress={() => onChangeScreen("SeventeenthComponent")}     
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
              onPress={() => onChangeScreen("TwentiethOneComponent")}     
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