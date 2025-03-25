import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, TouchableOpacity, StyleSheet, I18nManager } from "react-native";
import ColorsApp from '../config/ColorsApp';
import Styles from "../config/Styles";
import { LinearGradient } from "expo-linear-gradient";
import TouchableScale from 'react-native-touchable-scale';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton, Switch, Paragraph, List, Modal } from 'react-native-paper';
import * as Updates from 'expo-updates';

import { Text, Card, Title } from "react-native-paper";
import { Animated } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import ProgressBar from 'react-native-animated-progress'; // Import the ProgressBar component
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { IconButton } from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function WelcomeComponent({ handleEndOfPage, ...props }) {

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const contextState = React.useContext(LanguageContext);
  let language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme, toggleTheme } = usePreferences();
  let languageNames = Object.values(Languages);
  languageNames = languageNames.map((l) => { return { label: l.label, value: l.value } })


  const toggleLanguage = async (selectedLanguage) => {

    if (selectedLanguage == "ar") {
       I18nManager.forceRTL(true);
       I18nManager.allowRTL(true);
    } else {
       I18nManager.forceRTL(false);
       I18nManager.allowRTL(false);
    }
    contextState.updateValue(selectedLanguage);

    showModal(true);

    setTimeout(() => {
      Updates.reloadAsync();
    }, 500);

  }

  return (
    <ImageBackground
      source={require("../../images/welcome.jpg")}
      style={styles.backgroundImage}
    >

      <View style={styles.container}>

        <View style={{ flex: 1, paddingTop: 50, paddingLeft: 50 }}>

          <IconButton
            icon={() => <MaterialCommunityIcons name="translate" size={30} color={'#fff'} />}
            onPress={showModal}
          />

        </View>
        <View style={{ flex: 2, marginHorizontal: 40, justifyContent: 'center', marginVertical: 10 }}>

          <Text numberOfLines={2} style={{ fontSize: 35, color: 'white', marginVertical: 10, marginHorizontal: 5 }}>
            {Strings.train_with}
          </Text>
          <Text numberOfLines={2} style={{ fontSize: 40, color: 'white', fontWeight: 'bold', marginVertical: 10 }}>
            {Strings.the_Best}
          </Text>

          <View style={Styles.card5_border2}></View>
          <Text numberOfLines={5} style={{ fontSize: 20, color: 'white', marginVertical: 10, marginHorizontal: 5 }}>
            {Strings.free_your_self}
          </Text>

        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableScale
            activeOpacity={1}
            activeScale={0.98}
            tension={100}
            friction={10}
            onPress={handleEndOfPage}
            style={{ paddingHorizontal: 25 }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{Strings.ST122}</Text>
            </View>
          </TouchableScale>
        </View>

      </View>

      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.modalContainer, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
<Text style={{fontSize:25}}>{Strings.ST109}</Text>
        <RadioButton.Group onValueChange={value => value !== language ? toggleLanguage(value) : null} value={language}>
          {languageNames.map((item, index) => (
            <RadioButton.Item mode="android" key={index} label={item.label} value={item.value} />
          ))}
        </RadioButton.Group>
      </Modal>

    </ImageBackground>
  );

}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    padding:50,
    marginHorizontal:20,
    borderRadius:4,
    backgroundColor: "#fff", // Customize the overlay color and opacity
  },
  container: {
    flex: 1,
    justifyContent: "flex-end", // Push the button to the bottom
    flexDirection: "column",
    width: '100%' // Ensure items are laid out vertically
  },
  button: {
    backgroundColor: ColorsApp.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center'
  },
});
