import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import AppLoading from "./AppLoading";
import Loading from "./AppLoading";
import { userUpdateGoal } from "../config/DataApp";
import { getAuth } from "firebase/auth";
import * as Updates from "expo-updates";

export function UpdateGoal({ selectedValues, ...props }) {
  const [loading, setLoading] = useState(true); // Start with loading set to true
  const [userId, setUserId] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Check if the user is signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
       
        setUserId(user.uid);
        const userJson = {
          user_id: user.uid,
          user_goal: JSON.stringify(selectedValues),
        };

        try {
          userUpdateGoal(userJson).then((response) => {
            if (response.status === 200) {
              Updates.reloadAsync();
            } else {
              console.log(response);
            }
          });
        } catch (error) {}
      } else {
        console.log("User is not signed in.");
        setUserId(null);
      }

      setLoading(false); // Set loading to false once the user status is checked
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Continue with your code here, you can now use `userId` in your logic.
  console.log("Selected Values:", selectedValues);
  // Rest of your code...

  return <SafeAreaView>{/* Your component UI */}</SafeAreaView>;
}
