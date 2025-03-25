import React, { useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import AppLoading from "../components/InnerLoading";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Card, Title, Paragraph } from "react-native-paper";
import usePreferences from "../hooks/usePreferences";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DietPlanCard(props) {
  const route = useRoute();
  const { dayData, dayName } = route.params; // Assuming 'program' now contains the diet data

  const { width } = useWindowDimensions();
  const { theme } = usePreferences();

  const [isLoaded, setIsLoaded] = useState(true);
  const [categoryImage, setCategoryImage] = useState(null);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const getDayName = (mealName) => {

    switch (mealName) {
      case "sunday":
        return "الأحد";
      case "monday":
        return "الإثنين";
      case "tuesday":
        return "الثلاثاء";
      case "wednesday":
        return "الأربعاء";
      case "thursday":
        return "الخميس";
      case "friday":
        return "الجمعة";
      case "saturday":
        return "السبت";
        default:
          return "يوم"
    }

  };

  const getMealName = (mealName) => {
    switch (mealName) {
      case "dinner":
        return "عشاء";
      case "snack1":
        return "سناك1";
      case "snack2":
        return "سناك2";
      case "lunch":
        return "غداء";
      case "breakfast":
        return "فطور";
      default:
        return "وجبة";
    }
  };

  // useEffect(() => {
  //   if (program) {
  //     setIsLoaded(true);
  //     setCategoryImage(`/images/${program.category_image}`); // If you still have category image in your data
  //   }
  // }, [program]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (!isLoaded) {
    return (
      <View style={{ marginTop: 50 }}>
        <AppLoading />
      </View>
    );
  } else {
    const baseUrl = "https://appadmin.mohannad-theeb.com";
    const imageSource = categoryImage
      ? { uri: `${baseUrl}${categoryImage}` }
      : require("../../images/food.jpg");

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <SafeAreaView>
          <ImageBackground
            source={imageSource}
            style={Styles.Header2Image}
            resizeMode={"cover"}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.4)"]}
              style={Styles.Header2Gradient}
            >
              <View style={styles.headerTextView}>
                <Text style={styles.headerText}>
                  {"Diet Plan Name"}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          
              <Card key={dayName} style={styles.dayCard} mode={"outlined"}>
                <Card.Title title={getDayName(dayName.toLowerCase())} />
                <Card.Content>
                  {["breakfast", "snack1", "lunch", "snack2", "dinner"].map(
                    (mealType) => (
                      <View key={mealType} style={{ marginVertical: 10 }}>
                        {dayData[mealType] && (
                          <Title
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              marginBottom: 5,
                            }}
                          >
                            {getMealName(mealType)}
                          </Title>
                        )}
                        {dayData[mealType]?.map((foodItem, foodIndex) => (
                          <View key={foodIndex} style={{ marginBottom: 10 }}>
                            <Paragraph>
                              <Text style={{ fontWeight: "bold" }}>
                                {foodItem.name}:
                              </Text>{" "}
                              {foodItem.portion} ({foodItem.calories} سعرة)
                            </Paragraph>
                          </View>
                        ))}
                      </View>
                    )
                  )}
                </Card.Content>
              </Card>



        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 0, // Add padding to the scroll view content
  },
  dayCard: {
    marginBottom: 15,
    borderWidth: 0,
    padding: 0,
    margin: 8
  },

  headerTextView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
