
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

export default function ReviewComponent({ onSelectValue, ...props }) {
  const onChangeScreen = (screen) => {
    props.navigation.replace(screen);
  };
  const [isLoaded,setIsLoaded]=useState(false)

  const scaleValue = useRef(new Animated.Value(1)).current;
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  useFocusEffect(
    React.useCallback(() => {
     setIsLoaded(true);
    }, [])
  );
  const [selectedOption, setSelectedOption] = useState(0);

  const handlePressIn = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? 0 : option));
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
    onSelectValue(33, option);
  };
 

if(isLoaded){
  return (
    <>
                <View style={Styles.componentContainer}>

      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <ProgressBar progress={60} height={5} backgroundColor={ColorsApp.PRIMARY} />
        <View style={{ display: 'flex', marginVertical: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{ marginBottom: 5, fontSize: 20 }}>1/7  </Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginBottom: 0, fontSize: 16, fontWeight: '800' }}>{Strings.qr}  </Text>
        </View>
      </View>
        <View style={[Styles.Customecard, Styles.cardContent3
        
        ]}>
          <TouchableOpacity
            
            onPress={() => handlePressIn(1)}
        
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              selectedOption==1 ? {borderWidth:5,borderColor:ColorsApp.PRIMARY} : null,
              
            ]}
          >
            <ImageBackground
              source={require('../../images/turkey.jpg')}
              style={Styles.card5_background3}
               imageStyle={{ borderRadius: 8, tintColor: 'black' }}
        overlayColor="rgba(0,0,0,0.7)"
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card5_gradient3}
              >
                <Row >
                  <Col
                    size={100}
                    style={{ justifyContent: "center", alignContent: "center" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <View style={Styles.optionContainer}>
                        <Text numberOfLines={2} style={[Styles.card1_title2,{fontSize:50}]}>
                        0 %
                                                </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                     
                        
                      </View>
                    </View>
                    
                  </Col>
                </Row>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        
      
      <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
           
            onPress={() => handlePressIn(2)}
        
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              selectedOption==2 ? {borderWidth:5,borderColor:ColorsApp.PRIMARY} : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/fish.jpg')}
              style={Styles.card5_background3}
               imageStyle={{ borderRadius: 8, tintColor: 'black' }}
  overlayColor="rgba(0,0,0,0.7)"
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
        justifyContent: "center",
      }}
    >
      <View style={[Styles.optionContainer, { justifyContent: 'center' }]}>
        <Text numberOfLines={2} style={[Styles.card1_title2, { fontSize:50 }]}>
          25 %
        </Text>
      </View>
      <View style={{ justifyContent: "flex-start", marginTop: 50 }}>
        
      </View>
    </View>
    
  </Col>
</Row>

              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
            
            onPress={() => handlePressIn(3)}
        
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              selectedOption==3 ? {borderWidth:5,borderColor:ColorsApp.PRIMARY} : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/beef.jpg')}
              style={Styles.card5_background3}
               imageStyle={{ borderRadius: 8, tintColor: 'black' }}
  overlayColor="rgba(0,0,0,0.7)"
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
                        justifyContent: "center",
                      }}
                    >
                      <View style={Styles.optionContainer}>
                        <Text numberOfLines={2} style={[Styles.card1_title2,{fontSize:50}]}>
                      50 %
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                     
                        
                      </View>
                    </View>
                    
                  </Col>
                </Row>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
      
      
      </View>
      <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
           
            onPress={() => handlePressIn(4)}
        
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              selectedOption==4? {borderWidth:5,borderColor:ColorsApp.PRIMARY} : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/chiken.jpg')}
              style={Styles.card5_background3}
               imageStyle={{ borderRadius: 8, tintColor: 'black' }}
  overlayColor="rgba(0,0,0,0.7)"
            >
              <LinearGradient
                colors={["rgba(50,0,0,0.1)", "rgba(0,0,0,0.7)"]}
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
                        justifyContent: "center",
                      }}
                    >
                      <View style={Styles.optionContainer}>
                        <Text numberOfLines={2} style={[Styles.card1_title2,{fontSize:50}]}>
                      75 %
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                        
                      </View>
                    </View>
                    
                  </Col>
                </Row>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={[Styles.Customecard, Styles.cardContent3]}>
          <TouchableOpacity
           
            onPress={() => handlePressIn(5)}
        
            activeOpacity={1}
            style={[
              { transform: [{ scale: scaleValue }] },
              selectedOption== 5 ? {borderWidth:5,borderColor:ColorsApp.PRIMARY} : null,
            ]}
          >
            <ImageBackground
              source={require('../../images/none.jpg')}
              style={Styles.card5_background3}
               imageStyle={{ borderRadius: 8, tintColor: 'black' }}
  overlayColor="rgba(0,0,0,0.7)"
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
                        justifyContent: "center",
                      }}
                    >
                      <View style={Styles.optionContainer}>
                        <Text numberOfLines={2} style={[Styles.card1_title2,{fontSize:50}]}>
100 %
                        </Text>
                      </View>
                      <View style={{ justifyContent: "flex-end", marginTop: 50 }}>
                     
                        
                      </View>
                    </View>
                    
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
            disabled={selectedOption=== 0}

              icon={language=='ar' ? "arrow-left-bold" : "arrow-right-bold"}
              mode='contained'
              onPress={() => onChangeScreen("GoalReview")}     
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