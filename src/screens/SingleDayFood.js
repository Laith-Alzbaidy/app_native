import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  SafeAreaView,
  I18nManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { getDietbyGoal, getDietById } from "../config/DataApp";
import { map, property } from "lodash";
import AppLoading from "../components/InnerLoading";
import TouchableScale from "react-native-touchable-scale";
import { List, Text, FAB } from "react-native-paper";
import { getAuth } from "firebase/auth";
import ColorsApp from "../config/ColorsApp";
import Styles from "../config/Styles";
import Languages from "../languages";
import usePreferences from '../hooks/usePreferences';

import LanguageContext from "../languages/LanguageContext";
export default function SingleDayFood(props) {
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const auth = getAuth();
  const [programData,setProgramData]=useState(null);

  const [userId, setUserId] = useState(null);

  const { route } = props;
  const { Program,day, title } = route.params;

  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);
  const {theme} = usePreferences();

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const fetchData = async () => {
   if(day){
    if (day === "day-1") {
      const sortedData = [...Program.diets_data_day1].sort((a, b) => {
          // Check for undefined values
          const courseA = a[0]?.course || '';
          const courseB = b[0]?.course || '';
  
          // Custom compare function
          if (courseA < courseB) {
              return -1;
          }
          if (courseA > courseB) {
              return 1;
          }
          return 0;
      });
  
      setProgramData(sortedData);
  }
  
  if (day === "day-2") {
    const sortedData = [...Program.diets_data_day2].sort((a, b) => {
        // Check for undefined values
        const courseA = a[0]?.course || '';
        const courseB = b[0]?.course || '';

        // Custom compare function
        if (courseA < courseB) {
            return -1;
        }
        if (courseA > courseB) {
            return 1;
        }
        return 0;
    });

    setProgramData(sortedData);
}
if (day === "day-3") {
  const sortedData = [...Program.diets_data_day3].sort((a, b) => {
      // Check for undefined values
      const courseA = a[0]?.course || '';
      const courseB = b[0]?.course || '';

      // Custom compare function
      if (courseA < courseB) {
          return -1;
      }
      if (courseA > courseB) {
          return 1;
      }
      return 0;
  });

  setProgramData(sortedData);
}
if (day === "day-4") {
  const sortedData = [...Program.diets_data_day4].sort((a, b) => {
      // Check for undefined values
      const courseA = a[0]?.course || '';
      const courseB = b[0]?.course || '';

      // Custom compare function
      if (courseA < courseB) {
          return -1;
      }
      if (courseA > courseB) {
          return 1;
      }
      return 0;
  });

  setProgramData(sortedData);
}
if (day === "day-5") {
  const sortedData = [...Program.diets_data_day5].sort((a, b) => {
      // Check for undefined values
      const courseA = a[0]?.course || '';
      const courseB = b[0]?.course || '';

      // Custom compare function
      if (courseA < courseB) {
          return -1;
      }
      if (courseA > courseB) {
          return 1;
      }
      return 0;
  });

  setProgramData(sortedData);
}
if (day === "day-6") {
  const sortedData = [...Program.diets_data_day6].sort((a, b) => {
      // Check for undefined values
      const courseA = a[0]?.course || '';
      const courseB = b[0]?.course || '';

      // Custom compare function
      if (courseA < courseB) {
          return -1;
      }
      if (courseA > courseB) {
          return 1;
      }
      return 0;
  });

  setProgramData(sortedData);
}
if (day === "day-7") {
  const sortedData = [...Program.diets_data_day7].sort((a, b) => {
      // Check for undefined values
      const courseA = a[0]?.course || '';
      const courseB = b[0]?.course || '';

      // Custom compare function
      if (courseA < courseB) {
          return -1;
      }
      if (courseA > courseB) {
          return 1;
      }
      return 0;
  });

  setProgramData(sortedData);
}
   }
  };
  const onClickItem = (id, title) => {
 
    
    props.navigation.navigate('dietdetails', {id, title});
  };
  const renderTranslate = (course) => {
    const courses = {
      1: "breakfast",
      2: "snak_1",
      3: "lunch",
      4: "snack_2",
      5: "dinner"
    };
  
    const translatedCourse = courses[course];
    const translatedTitle = translatedCourse.replace(/\s/g, ""); // Remove spaces from cardTitle
    return Strings[translatedTitle];
  };
  useEffect(() => {
    fetchData();
  }, [userId,Program]);
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            {map(programData, (item, i) => (
               <React.Fragment key={i}>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      Styles.card3_title,
                      { 
                        textAlign: "center",
                        fontSize: 20,
                        color: theme === 'dark' ? 'white' : 'black' 
                      }
                    ]}
                                      >
                    {renderTranslate(item[0].course)}
                  </Text>
                </View>

                <TouchableScale
                  key={i}
                  activeOpacity={1}
                  onPress={() => onClickItem(item[0].diet_id, item[0].diet_title)}
                  activeScale={0.98}
                  tension={100}
                  friction={10}
                >
                  <ImageBackground
source={{ uri: `https://appadmin.mohannad-theeb.com/images/${item[0].diet_image}` }}
style={Styles.card3_background}
                    imageStyle={{ borderRadius: 8 }}
                  >
                    <LinearGradient
                      colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                      style={Styles.card3_gradient}
                    >
                      
                      <Text numberOfLines={2} style={Styles.card3_title}>
                        {item[0].diet_title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[Styles.card3_subtitle, { opacity: 0.6 }]}
                      >
                        {item.calories} {Strings.ST46} | {Strings.ST62}{" "}
                        {item[0].servings}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableScale>
              </React.Fragment>
            ))}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
