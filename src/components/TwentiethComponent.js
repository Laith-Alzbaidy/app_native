
import React, { useRef, useState } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import ColorsApp from '../config/ColorsApp';
import Styles from "../config/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Text ,Button} from "react-native-paper";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import ProgressBar from 'react-native-animated-progress'; // Import the ProgressBar component
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import ConfigApp from "../config/ConfigApp";
import { useFocusEffect } from '@react-navigation/native';

export default function TwentiethComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const [isLoaded,setIsLoaded]=useState(false)

  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  useFocusEffect(
    React.useCallback(() => {
     setIsLoaded(true);
    }, [])
  );
  
  const handlePressIn = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((id) => id !== option)
        : [...prevOptions, option]
    );
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
    onSelectValue(option);
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
                <View style={Styles.componentContainer}>

      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <ProgressBar progress={60} height={5} backgroundColor={ColorsApp.PRIMARY} />
        <View style={{ display: 'flex', marginVertical: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{ marginBottom: 5, fontSize: 20 }}>20/27  </Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginBottom: 0, fontSize: 16, fontWeight: '800' }}>{Strings.q19}  </Text>
        </View>
      </View>
        <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
            onPress={() => {
              // Handle the press event
            }}
            onPressIn={() => handlePressIn(1)}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              isSelected(1) ? Styles.selectedOption : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/turkey.jpg')}
              style={Styles.card5_background3}
              imageStyle={{ borderRadius: 8 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card5_gradient3}
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
                          {Strings.q19a1}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        {isSelected(1) && (
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
        
      
      <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
            onPress={() => {
              // Handle the press event
            }}
            onPressIn={() => handlePressIn(2)}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              isSelected(2) ? Styles.selectedOption : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/fish.jpg')}
              style={Styles.card5_background3}
              imageStyle={{ borderRadius: 8 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card5_gradient3}
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
                          {Strings.q19a2}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        {isSelected(2) && (
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
        <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
            onPress={() => {
              // Handle the press event
            }}
            onPressIn={() => handlePressIn(3)}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              isSelected(3) ? Styles.selectedOption : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/beef.jpg')}
              style={Styles.card5_background3}
              imageStyle={{ borderRadius: 8 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card5_gradient3}
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
                          {Strings.q19a3}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        {isSelected(3) && (
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
      <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
            onPress={() => {
              // Handle the press event
            }}
            onPressIn={() => handlePressIn(4)}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              isSelected(4) ? Styles.selectedOption : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/chiken.jpg')}
              style={Styles.card5_background3}
              imageStyle={{ borderRadius: 8 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card5_gradient3}
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
                          {Strings.q19a4}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        {isSelected(4) && (
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
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
            onPress={() => {
              // Handle the press event
            }}
            onPressIn={() => handlePressIn(5)}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              isSelected(5) ? Styles.selectedOption : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/none.jpg')}
              style={Styles.card5_background3}
              imageStyle={{ borderRadius: 8 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card5_gradient3}
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
                          {Strings.q19a5}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        {isSelected(5) && (
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
      </View>
<View style={Styles.containerButton2}>
        <Grid>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
             
             icon={language=='ar' ? "arrow-right-bold" : "arrow-left-bold"}
              disabled={false}
              mode='text'
              onPress={() => onChangeScreen("NineteenthComponent")}     
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