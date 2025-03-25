import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, I18nManager, Linking } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { List } from "react-native-paper";
import Styles from "../config/Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import usePreferences from "../hooks/usePreferences";
import { check_user_subscription,get_phone } from "../config/DataApp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { getAuth } from "firebase/auth";

export default function DrawerContent(props) {
  const [isPayed, setIsPayed] = useState(false);
  const auth = getAuth();

  const [userId, setUserId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();
  const [isOpen, setIsOpen] = useState(false);

  const { navigation } = props;
  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";
  const downIcon = isOpen ? "chevron-up" : "chevron-down";

  const onChangeScreen = (screen) => {
    navigation.navigate(screen);
  };

  const fetchData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const response = await check_user_subscription(currentUser.uid);
        if (response.status === 200) {
          setIsPayed(true);
        } else {
          setIsPayed(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  const [NutritionSpecialistPhone,setNutritionSpecialistPhone]=useState(null);
  const[couchPhone,setchouchPhone]=useState(null);
  const fetchPhone = async () => {
  try {
    const phone = await get_phone();
    if (phone && phone.aaData && phone.aaData.length > 0 && phone.aaData[0].Nutrition_Specialist) {
     
      setNutritionSpecialistPhone(phone.aaData[0].Nutrition_Specialist);
      setchouchPhone(phone.aaData[0].Sports_Coach);
    }
  } catch (error) {
    console.error('An error occurred while fetching phone data:', error);
  }
};

useEffect(() => {
  fetchPhone();
}, []); 

  useEffect(() => {
    fetchData();
  }, [isPayed]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const handleWhatsAppPress = async (phone) => {
    const whatsappNumber = `whatsapp://send?phone=${phone}`; // Replace this with the actual phone number
    const isSupported = await Linking.canOpenURL(whatsappNumber);
  
    if (isSupported) {
      // Open WhatsApp
      await Linking.openURL(whatsappNumber);
    } else {
      console.error("Can't open WhatsApp on this device.");
    }
  };

  return (
    <DrawerContentScrollView>
      <TouchableOpacity
        onPress={isPayed ? () => onChangeScreen("home") : null}
        activeOpacity={0.8}
      >
        <View style={Styles.DrawerHeader}>
          <Image
            source={
              theme === "dark"
                ? require("../../assets/mt-logo.png")
                : require("../../assets/mt-logo.png")
            }
            resizeMode="contain"
            style={Styles.DrawerImage}
          />
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => onChangeScreen("workouts")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST5}
            left={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconMenu}
                name="calendar-month-outline"
              />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangeScreen("exercises")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST21}
            left={(props) => (
              <Icon {...props} style={Styles.DrawerIconMenu} name="dumbbell" />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangeScreen("diets")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST27}
            left={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconMenu}
                name="fruit-watermelon"
              />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangeScreen("store")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST45}
            left={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconMenu}
                name="cart-outline"
              />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangeScreen("blog")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST29}
            left={(props) => (
              <Icon {...props} style={Styles.DrawerIconMenu} name="rss" />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("profile", { isPayed: isPayed })}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST6}
            left={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconMenu}
                name="account-outline"
              />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChangeScreen("favorites")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST4}
            left={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconMenu}
                name="heart-outline"
              />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.send_message}
            left={(props) => (
              <Icon {...props} style={Styles.DrawerIconMenu} name="message" />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>
        {isOpen && (
          <View>
            <TouchableOpacity
              onPress={() => onChangeScreen("send_message")}
              activeOpacity={0.8}
            >
              <List.Item
                titleStyle={Styles.DrawerTitleMenu}
                style={Styles.DrawerMenuItem}
                title={Strings.send_request}
                left={(props) => (
                  <Icon {...props} style={Styles.DrawerIconMenu} name="send" />
                )}
                right={(props) => (
                  <Icon
                    {...props}
                    style={Styles.DrawerIconRightMenu}
                    name={rightIcon}
                  />
                )}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onChangeScreen("all_message")}
              activeOpacity={0.8}
            >
              <List.Item
                titleStyle={Styles.DrawerTitleMenu}
                style={Styles.DrawerMenuItem}
                title={Strings.all_request}
                left={(props) => (
                  <Icon
                    {...props}
                    style={Styles.DrawerIconMenu}
                    name="message-bulleted"
                  />
                )}
                right={(props) => (
                  <Icon
                    {...props}
                    style={Styles.DrawerIconRightMenu}
                    name={rightIcon}
                  />
                )}
              />
            </TouchableOpacity>
           
           
          </View>
        )}

        <TouchableOpacity
          onPress={() => onChangeScreen("settings")}
          activeOpacity={0.8}
        >
          <List.Item
            titleStyle={Styles.DrawerTitleMenu}
            style={Styles.DrawerMenuItem}
            title={Strings.ST108}
            left={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconMenu}
                name="cog-outline"
              />
            )}
            right={(props) => (
              <Icon
                {...props}
                style={Styles.DrawerIconRightMenu}
                name={rightIcon}
              />
            )}
          />
        </TouchableOpacity>
       {couchPhone &&
       <TouchableOpacity
       onPress={() => handleWhatsAppPress(couchPhone)}
                 activeOpacity={0.8}
               >
                 <List.Item
                   titleStyle={Styles.DrawerTitleMenu}
                   style={Styles.DrawerMenuItem}
                   title={Strings.Sports_Coach}
                   left={(props) => (
                     <Icon
                       {...props}
                       style={Styles.DrawerIconMenu}
                       name="whatsapp"
                     />
                   )}
                   
                 />
               </TouchableOpacity>
       } 
       {NutritionSpecialistPhone &&
       <TouchableOpacity
       onPress={() => handleWhatsAppPress(NutritionSpecialistPhone)}
                 activeOpacity={0.8}
               >
                 <List.Item
                   titleStyle={Styles.DrawerTitleMenu}
                   style={Styles.DrawerMenuItem}
                   title={Strings.Nutrition_Specialist}
                   left={(props) => (
                     <Icon
                       {...props}
                       style={Styles.DrawerIconMenu}
                       name="whatsapp"
                     />
                   )}
                   
                 />
               </TouchableOpacity>
       } 
      </View>
    </DrawerContentScrollView>
  );
}
