import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from './DrawerContent';
import DrawerContent2 from './DrawerContent2';
import ModalNavigation from "./ModalNavigation";
import { check_user_subscription } from '../config/DataApp';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppLoading from "../components/AppLoading";
import { getAuth } from 'firebase/auth';
const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
  const auth = getAuth();
  const [isLoaded, setIsLoaded] = useState(false);

	const [userId, setUserId] = useState(null);

  const [isPayed, setIsPayed] = useState(false);
  const fetchData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        try {
            const response = await check_user_subscription(currentUser.uid);
            if (response.status == 200) {
                setIsPayed(true);
            } else {
                setIsPayed(false);
            }
            setIsLoaded(true)
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
};



useFocusEffect(
    React.useCallback(() => {
        fetchData();
    }, [])
);
if (!isLoaded) {

  return (
 
      <AppLoading/>
 
       );
  }else{
    return (
      <Drawer.Navigator
        initialRouteName="main"
        drawerContent={(props) => (
          isPayed ? (
            <DrawerContent {...props}  />
          ) : (
            <DrawerContent2 {...props}  />
          )
        )}
      >
        <Drawer.Screen name="main" component={ModalNavigation} options={{ headerShown: false }} />
      </Drawer.Navigator>
    );
  }

};

export default DrawerNavigation;
