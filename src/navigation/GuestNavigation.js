import React, { useRef, useState, lazy, Suspense } from "react";
import { I18nManager } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import Login from '../screens/Login';
import OTP from '../screens/OTP';
import Bmi from "../screens/Bmi";
import Register from '../screens/Register';
import ForgotPass from '../screens/ForgotPass';
import About from '../screens/About';
import Terms from '../screens/Terms';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import FirstComponent from "../components/FirstComponent";
import SecondComponent from "../components/SecoundComponent";
import { Asset } from 'expo-asset';
import { useEffect } from "react";
const FifteenthComponent = React.lazy(() => import("../components/FifteenthComponent"));

const ThirdComponent = React.lazy(() => import("../components/ThirdComponent"));
const FourthComponent = React.lazy(() => import("../components/FourthComponent"));
const FifthComponent = React.lazy(() => import("../components/FifthComponent"));
const SixthComponent = React.lazy(() => import("../components/SixthComponent"));
const SeventhComponent = React.lazy(() => import("../components/SeventhComponent"));
const EighthComponent = React.lazy(() => import("../components/EighthComponent"));
const NinthComponent = React.lazy(() => import("../components/NinthComponent"));
const TenthComponent = React.lazy(() => import("../components/TenthComponent"));
const EleventhComponent = React.lazy(() => import("../components/EleventhComponent"));
const TwelfthComponent = React.lazy(() => import("../components/TwelfthComponent"));
const ThirteenthComponent = React.lazy(() => import("../components/ThirteenthComponent"));
const FourteenthComponent = React.lazy(() => import("../components/FourteenthComponent"));
const SixteenthComponent = React.lazy(() => import("../components/SixteenthComponent"));
const SeventeenthComponent = React.lazy(() => import("../components/SeventeenthComponent"));
const EighteenthComponent = React.lazy(() => import("../components/EighteenthComponent"));
const NineteenthComponent = React.lazy(() => import("../components/NineteenthComponent"));
const TwentiethComponent = React.lazy(() => import("../components/TwentiethComponent"));
const TwentiethOneComponent = React.lazy(() => import("../components/TwentiethOneComponent"));
const TwentiethTwoComponent = React.lazy(() => import("../components/TwentiethTwoComponent"));
const TwentieththreeComponent = React.lazy(() => import("../components/TwentieththreeComponent"));
const TwentiethfourComponent = React.lazy(() => import("../components/TwentiethfourComponent"));
const TwentiethFiveComponent = React.lazy(() => import("../components/TwentiethFiveComponent"));
const TwentiethsSixComponent = React.lazy(() => import("../components/TwentiethsSixComponent"));
const TwentiethsSevenComponent = React.lazy(() => import("../components/TwentiethsSevenComponent"));
const TwentiethsEightComponent = React.lazy(() => import("../components/TwentiethsEightComponent"));
const TwentiethsNineComponent = React.lazy(() => import("../components/TwentiethsNineComponent"));

const RootStack = createStackNavigator();
let user_data = [];
const cacheImages = (images) => {

  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default function GuestNavigation(props) {
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

  const handleSelectValue = (data) => {
    setSelectedValues((prevSelectedValues) => {
      // const componentIndex = prevSelectedValues.findIndex(
      //   (item) => item.componentId === componentId
      // );

      // if (componentIndex !== -1) {
      //   const updatedValues = [...prevSelectedValues];
      //   updatedValues[componentIndex] = { componentId, value, question, text };
      //   console.log(updatedValues)
      //   return updatedValues;
      // }
      console.log(data)
      // If the componentId doesn't exist, push it to the user_data array
      user_data = data
     
      return user_data;
    });
  };
  useEffect(() => {
console.log(selectedValues);
  }, [selectedValues]); 
  return (
    <RootStack.Navigator screenOptions={(route) => { return navigatorOptions }}>
   <RootStack.Screen name="login" component={Login} options={{ unmountOnBlur: true,title:"", headerTransparent: true }} />
   <RootStack.Screen name="OTP" component={OTP} options={{ unmountOnBlur: true,title:"", headerTransparent: true }} />
   <RootStack.Screen name="register" options={({ navigation }) => ({unmountOnBlur: true ,title:"",headerLeft: ()=> null
    // headerLeft: () => customeButtonBack(navigation, 'login')
  })
    }>

        {(props) => <Register {...props} selectedValues={user_data} />}
      </RootStack.Screen> 
   <RootStack.Screen name="forgot" component={ForgotPass} options={{ title: Strings.ST43, headerTransparent: true, headerLeft: buttonBack }} />
      <RootStack.Screen name="about" component={About} options={{ title: Strings.ST110 }} />
      <RootStack.Screen name="terms" component={Terms} options={{ title: Strings.ST8 }} />
     
      <RootStack.Screen name="Bmi" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethEightComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <Bmi {...props} selectedValues={user_data} />
          </Suspense>
        )}
      </RootStack.Screen>
      <RootStack.Screen options={{ unmountOnBlur: false,title: "", headerLeft: null }} name="FirstComponent"  >
        {(props) => <FirstComponent {...props} onSelectValue={handleSelectValue} />}
      </RootStack.Screen>
      <RootStack.Screen options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'FirstComponent')})} name="SecondComponent">
        {(props) => <SecondComponent {...props} onSelectValue={handleSelectValue} />}
      </RootStack.Screen>
      
      <RootStack.Screen options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'SecondComponent')})} name="ThirdComponent">
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <ThirdComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>
      <RootStack.Screen name="FourthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'ThirdComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <FourthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="FifthComponent" options={({ navigation }) => ({unmountOnBlur: false,title: "",headerLeft: () => customeButtonBack(navigation, 'FourthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <FifthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="SixthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'FifthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <SixthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="SeventhComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'SixthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <SeventhComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="EighthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'SeventhComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <EighthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="NinthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'EighthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <NinthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'NinthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TenthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="EleventhComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <EleventhComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwelfthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'EleventhComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwelfthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="ThirteenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwelfthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <ThirteenthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="FourteenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'ThirteenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <FourteenthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen> 
      {user_data[1] && (
<>
<RootStack.Screen name="FifteenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'FourteenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <FifteenthComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="SixteenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'FifteenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <SixteenthComponent {...props} onSelectValue={handleSelectValue} user_data={user_data} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="SeventeenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'SixteenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <SeventeenthComponent {...props} onSelectValue={handleSelectValue}  />
          </Suspense>
        )}
      </RootStack.Screen>
      <RootStack.Screen name="EighteenthComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'SeventeenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <EighteenthComponent {...props} onSelectValue={handleSelectValue}  />
          </Suspense>
        )}
      </RootStack.Screen>
      <RootStack.Screen name="TwentiethOneComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'EighteenthComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethOneComponent {...props} user_data={user_data} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethTwoComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethOneComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethTwoComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethThreeComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethTwoComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentieththreeComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethFourComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethThreeComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethfourComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethFiveComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethFourComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethFiveComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethSixComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethFiveComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethsSixComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethSevenComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethSixComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethsSevenComponent {...props} onSelectValue={handleSelectValue} selectedValues={user_data} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethEightComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethSevenComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethsEightComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>

      <RootStack.Screen name="TwentiethNineComponent" options={({ navigation }) => ({unmountOnBlur: true,title: "",headerLeft: () => customeButtonBack(navigation, 'TwentiethEightComponent')})}>
        {(props) => (
          <Suspense fallback={<AppLoading startAsync={loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />}>
            <TwentiethsNineComponent {...props} onSelectValue={handleSelectValue} />
          </Suspense>
        )}
      </RootStack.Screen>
</>
      )}
      
    </RootStack.Navigator>
  );
}