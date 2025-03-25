import React, { useState, useEffect } from "react";
import { View, ImageBackground, Linking, TouchableOpacity } from "react-native";
import Styles from "../config/Styles";
import Loading from "./InnerLoading";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import { getAuth } from "firebase/auth";
import {
  getDietbyGoal,
  get_phone,
  getUserData,
} from "../config/DataApp";
import Heading from "./Heading";

export default function GoalFood(props) {
  const auth = getAuth();

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [dietId, setdietId] = useState("");
  const [view, setView] = useState(false);
  const [userId, setUserId] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [program, setProgram] = useState(null);
  const navigation = useNavigation();
  const [NutritionSpecialistPhone, setNutritionSpecialistPhone] =
    useState(null);

  const fetchData = async () => {
    setUserId(auth.currentUser.uid);
    if (userId) {
      try {
        const response = await getDietbyGoal(userId);
        const phone = await get_phone();
        if (
          phone &&
          phone.aaData &&
          phone.aaData.length > 0 &&
          phone.aaData[0].Nutrition_Specialist
        ) {
          setNutritionSpecialistPhone(phone.aaData[0].Nutrition_Specialist);
        }
        if (response.status == 200) {
          setProgram(response.aaData);
          if (response && response.aaData && response.aaData.category_image) {
            setCategoryImage(`/images/${response.aaData.category_image}`);
            setView(true);
          }

          setIsLoaded(true);
          const res = await getUserData(userId);
          const dietString = JSON.parse(res.diet);
          const dietTable = JSON.parse(dietString.choices[0].message.content);
          console.log(dietTable);

          setProgram(dietTable);

          const workouts = JSON.parse(res.workout);
          const table = JSON.parse(workouts.choices[0].message.content);
          console.log(table);


        } else {
          setIsLoaded(true);

          setView(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    //9950x
  }, [userId, isLoaded]);
  useFocusEffect(
    React.useCallback(() => {
      console.log("#########");
      fetchData(); // Fetch data every time the component gains focus
    }, [userId])
  );
  const phoneNumber = `whatsapp://send?phone=${NutritionSpecialistPhone}`;

  const handleCallPress = async () => {};

  const naav = () => {
    props.navigation.navigate("dietdetailsCard", { program: dietTable });
  };

  if (!isLoaded) {
    return <Loading />;
  }

  if (isLoaded && !view) {
    return (
      <View key="call">
        <View style={{ marginRight: 20 }}>
          <Heading title={Strings.you_goal_diet} />

          <TouchableScale
            style={{ borderRadius: 8, marginVertical: 10 }}
            activeOpacity={1}
            onPress={() => navigation.navigate("dietdetailsCard", { program })}
            activeScale={0.98}
            tension={100}
            friction={10}
          >
            <ImageBackground
              source={require("../../images/food.jpg")}
              style={Styles.card1_goal}
              imageStyle={{ borderRadius: 8 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                style={Styles.card1_gradient}
              >
                <View style={Styles.card4_viewicon}>
                  <Text style={{ fontSize: 20, color: "#fff", opacity: 0.9 }}>
                  الجدول الغذائي
                  </Text>
                </View>
                <Text numberOfLines={1} style={Styles.card4_title}>

                </Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableScale>
        </View>
      </View>
    );
  }
  if (isLoaded && view) {
    const baseUrl = "https://appadmin.mohannad-theeb.com"; // Replace with your actual base URL

    const imageSource = categoryImage
      ? { uri: `${baseUrl}${categoryImage}` }
      : require("../../images/food.jpg");
    return (
      <View style={{ marginRight: 20 }}>
        <Heading title={Strings.you_goal_diet} />

        <TouchableScale
          style={{ borderRadius: 8, marginVertical: 10 }}
          activeOpacity={1}
          onPress={() => navigation.navigate("dietdetailsCard", { program })}
          activeScale={0.98}
          tension={100}
          friction={10}
        >
          <ImageBackground
            source={imageSource}
            style={Styles.card1_goal}
            imageStyle={{ borderRadius: 8 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
              style={Styles.card1_gradient}
            >
              <View style={Styles.card4_title}>
                <Text style={{ fontSize: 20, color: "#fff" }}>
                  {program.name}
                </Text>
              </View>
              <Text numberOfLines={1} style={Styles.card4_title}></Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableScale>
      </View>
    );
  }
}
