import React, { useRef, useState, lazy, Suspense } from "react";
import { I18nManager } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import { UpdateGoal } from "../components/UpdateGoal";
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import ReviewComponent from "../components/ReviewCmponent";
import GoalReview from "../components/GoalReview";
import PlaceReview from "../components/PlaceReview";
import LevelReview from "../components/LevelReview";
import { Asset } from 'expo-asset';
import { useEffect } from "react";
import FoodReview from "../components/FoodReview";
import WeightReview from "../components/WeightReview";
import HightReview from "../components/HightReview";


const RootStack = createStackNavigator();
const user_data = [];
const cacheImages = (images) => {

  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default function UpdateNavigation(props) {
  const navigation = useNavigation();
  const loadAssetsAsync = async () => {

    const imageAssets = cacheImages([
      require('../../assets/male.jpg'),
      require('../../assets/female.jpg'),
      require('../../assets/logo.png'),
      require('../../assets/mt-logo.png'),
    ]);

    await Promise.all([...imageAssets]);
  }
  const [isReady, setIsReady] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();
  const [selectedValues, setSelectedValues] = useState(user_data);

  const buttonBack = () => {
    return (
      <IconButton
        icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"}
        style={{ marginLeft: 15 }}
        size={24}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const navigatorOptions = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    presentation: 'modal',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    headerTintColor: theme === "dark" ? 'white' : 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    gestureEnabled: true,
  };

  const handleSelectValue = (componentId, value) => {
    setSelectedValues((prevSelectedValues) => {
        const componentIndex = prevSelectedValues.findIndex(
            (item) => item.componentId == componentId
        );

        if (componentIndex !== -1) {
            console.log("@@@@@@@@@")
            const updatedValues = [...prevSelectedValues];
            updatedValues[componentIndex] = { componentId, value };
            console.log(updatedValues)
            // Return only the updated item, not the entire array
            return updatedValues;
        }

        // If the componentId doesn't exist, push it to the user_data array
        user_data.push({ componentId, value });

        return [...prevSelectedValues, { componentId, value }];
    });
}; 

const customeButtonBack = (navigation, page) => {
  return (
    <IconButton
      icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"}
      style={{ marginLeft: 15 }}
      size={24}
      onPress={() => navigation.replace(page)}
    />
  );
};
  useEffect(() => {
console.log(selectedValues);
console.log("@@@")
  }, [selectedValues]); 
  return (
    <RootStack.Navigator screenOptions={(route) => { return navigatorOptions }}>

      <RootStack.Screen options={{ unmountOnBlur: true,title: "", }} name="ReviewComponent"  >
        {(props) => <ReviewComponent {...props} onSelectValue={handleSelectValue} />}
      </RootStack.Screen>
      <RootStack.Screen
  options={({ navigation }) => ({
    unmountOnBlur: true,
    title: "",
    headerLeft: () => customeButtonBack(navigation, 'ReviewComponent'),
  })}
  name="GoalReview"
>
  {(props) => <GoalReview {...props} onSelectValue={handleSelectValue} />}
</RootStack.Screen>

<RootStack.Screen
  options={({ navigation }) => ({
    unmountOnBlur: true,
    title: "",
    headerLeft: () => customeButtonBack(navigation, 'GoalReview'),
  })}
  name="LevelReview"
>
  {(props) => <LevelReview {...props} onSelectValue={handleSelectValue} />}
</RootStack.Screen>

<RootStack.Screen
  options={({ navigation }) => ({
    unmountOnBlur: true,
    title: "",
    headerLeft: () => customeButtonBack(navigation, 'LevelReview'),
  })}
  name="PlaceReview"
>
  {(props) => <PlaceReview {...props} onSelectValue={handleSelectValue} />}
</RootStack.Screen>


<RootStack.Screen
  options={({ navigation }) => ({
    unmountOnBlur: true,
    title: "",
    headerLeft: () => customeButtonBack(navigation, 'PlaceReview'),
  })}
  name="HightReview"
>
  {(props) => <HightReview {...props} selectedValues={selectedValues} onSelectValue={handleSelectValue} />}
</RootStack.Screen>

<RootStack.Screen
  options={({ navigation }) => ({
    unmountOnBlur: true,
    title: "",
    headerLeft: () => customeButtonBack(navigation, 'HightReview'),
  })}
  name="WeightReview"
>
  {(props) => <WeightReview {...props} selectedValues={selectedValues} onSelectValue={handleSelectValue} />}
</RootStack.Screen>

<RootStack.Screen
  options={({ navigation }) => ({
    unmountOnBlur: true,
    title: "",
    headerLeft: () => customeButtonBack(navigation, 'WeightReview'),
  })}
  name="FoodReview"
>
  {(props) => <FoodReview {...props} selectedValues={selectedValues} onSelectValue={handleSelectValue} />}
</RootStack.Screen>

    
      
      
      
      <RootStack.Screen
        name="update"
        options={{
          title: Strings.ST11,
          headerTransparent: true,
          headerLeft: buttonBack,
        }}
      >
        {(props) => <UpdateGoal {...props} selectedValues={selectedValues} />}
      </RootStack.Screen> 


      
      
    </RootStack.Navigator>
  );
}