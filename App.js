import React, { useState, useEffect, useMemo } from "react";
import "./src/config/ConfigFirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogBox, StatusBar, I18nManager, Platform } from "react-native"; // Added I18nManager
import Loading from "./src/components/AppLoading";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import LanguageContext from "./src/languages/LanguageContext";
import Preferences from "./src/context/Preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { check_if_need_update_goal } from "./src/config/DataApp";
import {
  Provider as PaperProvider,
  MD2LightTheme as DefaultThemePaper,
  MD2DarkTheme as DarkThemePaper,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as DefaultThemeNav,
  DarkTheme as DarkThemeNav,
} from "@react-navigation/native";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
import UpdateNavigation from "./src/navigation/UpdateNavigation";
import GuestNavigation from "./src/navigation/GuestNavigation";
import ColorsApp from "./src/config/ColorsApp";
import ConfigApp from "./src/config/ConfigApp";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import "moment/locale/es";
import "moment/locale/ar";
import WelcomeComponent from "./src/components/WelcomeComponent";
import { checkPluginState } from "react-native-reanimated/lib/reanimated2/core";
DarkThemePaper.colors.primary = ColorsApp.PRIMARY;
DarkThemePaper.colors.accent = ColorsApp.PRIMARY;
DarkThemePaper.roundness = 6;

DefaultThemePaper.colors.primary = ColorsApp.PRIMARY;
DefaultThemePaper.colors.accent = ColorsApp.PRIMARY;
DefaultThemePaper.roundness = 6;
DefaultThemeNav.colors.background = "#fff";
import * as Updates from 'expo-updates';

LogBox.ignoreAllLogs();

const auth = getAuth();

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const loadAssetsAsync = async () => {
  const imageAssets = cacheImages([
    require("./assets/male.jpg"),
    require("./assets/female.jpg"),
    require("./assets/logo.png"),
    require("./assets/mt-logo.png"),
  ]);

  await Promise.all([...imageAssets]);
};

const App = () => {
  const [userId, setUserId] = useState(null);
  const [theme, setTheme] = useState(ConfigApp.THEMEMODE);
  const [isLogged, setIsLogged] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState(ConfigApp.DEFAULTLANG);
  const [welcome, setWelcome] = useState(true);
  const [needUpdate,setNeedUpdate]=useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    AsyncStorage.setItem("themeSetting", theme);
  };

  const handleEndOfPage = () => {
    setWelcome(false);
  };
  
 


  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  const updateValue = (lang) => {
    setLanguage(lang);
    AsyncStorage.setItem("language", lang);
  };

  useEffect(() => {
    async function checkUser() {
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          setIsLogged(true);
          setLoaded(true);
        } else {
          setIsLogged(false);
          setLoaded(true);
        }
      });
    }

    checkUser();
  }, []);

  useEffect(() => {
    async function checkTheme() {
      await AsyncStorage.getItem("themeSetting").then((value) => {
        if (value) {
          setTheme(value === "dark" ? "light" : "dark");
        }
      });
    }

    checkTheme();
  }, []);
 
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    AsyncStorage.getItem("language").then((lang) => {
      console.log(lang);
      if (lang) {
        setLanguage(lang);
        if (lang === "ar") {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);

        } else {
          I18nManager.forceRTL(false); // Reset to LTR for other languages
          I18nManager.allowRTL(false);
        }
      }else{
        
      const shouldBeRTL=true;
      if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        Updates.reloadAsync();
      }
      }
    });
  }, []);

  useEffect(() => {
    if (language == "es" || language == "ar") {
      moment.locale(language);
    } else {
      moment.locale("en");
    }
  }, [language]);
 useEffect(() => {
  if(isLogged){
    setLoaded(false);

    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
          try {
              const response = await check_if_need_update_goal(currentUser.uid);
              console.log(response);
              if (response.status == 200) {
                setNeedUpdate(true)
              } else {
                setNeedUpdate(false);
              }
              setLoaded(true);

          } catch (error) {
              console.error("An error occurred:", error);
          }
      }
  };
  fetchData();
  
    }
 
   
 }, [isLogged])
 




  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  if (!loaded) {
    return <Loading />;
  }

  if (loaded && isReady) {
    return (
      <Preferences.Provider value={preference}>
        <LanguageContext.Provider value={{ language, updateValue }}>
          <PaperProvider
            theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}
            settings={{ icon: (props) => <MaterialIcons {...props} /> }}
          >
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={theme === "dark" ? "light-content" : "dark-content"}
            />
            {welcome && !isLogged ? (
              <WelcomeComponent handleEndOfPage={handleEndOfPage} />
            ) : (
              <NavigationContainer
                theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}
              >
               {!isLogged && <GuestNavigation /> }

                {isLogged && !needUpdate && <DrawerNavigation />  }
                {isLogged && needUpdate && <UpdateNavigation />  }

              </NavigationContainer>
            )}
          </PaperProvider>
        </LanguageContext.Provider>
      </Preferences.Provider>
    );
  }
};

export default App;
