import React, { useRef, useState } from "react";
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

export default function NinthComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOption, setSelectedOption] = useState(0);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;


  const handlePressIn = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? 0 : option));
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
    onSelectValue(9, option);
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
            <View style={Styles.componentContainer}>

 <View style={{ width: '100%',paddingHorizontal:20 }}>
 <ProgressBar progress={27} height={5} backgroundColor={ColorsApp.PRIMARY} />

<View style={{display:'flex',marginVertical:2,flexDirection:'row',justifyContent:'flex-end'}}>

<Text style={{ marginBottom: 5,fontSize:20 }}>9/28  </Text>


</View>
<View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Text style={{ marginBottom: 0,fontSize:15,fontWeight:'800' }}>{Strings.q8}  </Text>
</View>

    </View>
      <View style={[Styles.Customecard, Styles.cardContent2]}>

        <TouchableOpacity
          onPress={() => {
            // Handle the press event
          }}
          onPressIn={() => handlePressIn(1)}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={[
            { transform: [{ scale: scaleValue }] },
            // Add border style when selected
            selectedOption === 1 ? Styles.selectedOption : null,
          ]}
        >
      <ImageBackground
      source={ require('../../images/6.jpg')}

        style={Styles.card5_background2}
        imageStyle={{ borderRadius: 8 }}
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
                      {Strings.q8a1}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "flex-end",marginTop:50 }}>

                      {selectedOption === 1 && (

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
      <View style={[Styles.Customecard, Styles.cardContent]}>

<TouchableOpacity
  onPress={() => {
    // Handle the press event
  }}
  onPressIn={() => handlePressIn(2)}
  onPressOut={handlePressOut}
  activeOpacity={1}
  style={[
    { transform: [{ scale: scaleValue }] },
    // Add border style when selected
    selectedOption === 2 ? Styles.selectedOption : null,
  ]}
>
<ImageBackground
      source={ require('../../images/7.jpg')}

style={Styles.card5_background2}
imageStyle={{ borderRadius: 8 }}
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
              {Strings.q8a2}
                </Text>
            </View>
            <View style={{ justifyContent: "flex-end",marginTop:50 }}>

              {selectedOption === 2 && (

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
<View style={[Styles.Customecard, Styles.cardContent]}>

<TouchableOpacity
  onPress={() => {
    // Handle the press event
  }}
  onPressIn={() => handlePressIn(3)}
  onPressOut={handlePressOut}
  activeOpacity={1}
  style={[
    { transform: [{ scale: scaleValue }] },
    // Add border style when selected
    selectedOption === 3 ? Styles.selectedOption : null,
  ]}
>
<ImageBackground
      source={ require('../../images/8.jpg')}

style={Styles.card5_background2}
imageStyle={{ borderRadius: 8 }}
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
              {Strings.q8a3}
                </Text>
            </View>
            <View style={{ justifyContent: "flex-end",marginTop:50 }}>

              {selectedOption === 3 && (

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
<View style={[Styles.Customecard, Styles.cardContent]}>

<TouchableOpacity
  onPress={() => {
    // Handle the press event
  }}
  onPressIn={() => handlePressIn(4)}
  onPressOut={handlePressOut}
  activeOpacity={1}
  style={[
    { transform: [{ scale: scaleValue }] },
    // Add border style when selected
    selectedOption === 4 ? Styles.selectedOption : null,
  ]}
>
<ImageBackground
      source={ require('../../images/9.jpg')}

style={Styles.card5_background2}
imageStyle={{ borderRadius: 8 }}
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
              {Strings.q8a4}
                </Text>
            </View>
            <View style={{ justifyContent: "flex-end",marginTop:50 }}>

              {selectedOption === 4 && (

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
</View>
<View style={Styles.containerButton2}>
        <Grid>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
             
             icon={language=='ar' ? "arrow-right-bold" : "arrow-left-bold"}
             disabled={false}
              mode='text'
              onPress={() => onChangeScreen("EighthComponent")}     
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
                        disabled={(selectedOption==0)}

              icon={language=='ar' ? "arrow-left-bold" : "arrow-right-bold"}
              mode='contained'
              onPress={() => onChangeScreen("TenthComponent")}     
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
