import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  SafeAreaView,
  I18nManager,
} from "react-native";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import {
  getWorkoutByDay,
  getWorkoutsList,
  getUserData,
} from "../config/DataApp";
import { map, size } from "lodash";
import AppLoading from "../components/InnerLoading";
import TouchableScale from "react-native-touchable-scale";
import { List, Text, FAB } from "react-native-paper";
import ColorsApp from "../config/ColorsApp";
import RestDay from "../components/RestDay";
import { getAuth } from "firebase/auth";

export default function SingleDay(props) {
  const auth = getAuth();

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;
  const [userId, setUserId] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (id, title) => {
    navigation.navigate("exercisedetails", { id, title });
  };

  const onClickStart = (id, day) => {
    navigation.navigate("timer", { id, day });
  };

  useEffect(() => {
    console.log("uid", userId);
    getAllWorkouts();
  }, [userId]);

  const getAllWorkouts = async () => {
    getWorkoutsList().then(async (response) => {
      setUserId(auth.currentUser.uid);
      if (userId) {
        const res = await getUserData(userId);

        const workouts = JSON.parse(res.workout);
        const table = JSON.parse(workouts.choices[0].message.content);
        const dayname = Object.keys(table.data)[id];
        const exercises = table.data[dayname];

        console.log(
          table
        );
        
        if (exercises && exercises != "off" && exercises.length > 0) {
          const exercisesIds = exercises.map((x) => parseInt(x.id) ?? "off");
          console.log(exercisesIds);
          const l = response.filter((value) => exercisesIds.includes(value.id));
          console.log("intersection", l);
          setItems(l);
        }
        setIsLoaded(true);
      }
    });
  };
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    if (size(items) >= 1) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <SafeAreaView>
              {map(items, (item, i) => (
                <TouchableScale
                  key={i}
                  activeOpacity={1}
                  onPress={() => onClickItem(item.id, item.title)}
                  activeScale={0.98}
                  tension={100}
                  friction={10}
                >
                  <List.Item
                    key={i}
                    title={item.title}
                    titleStyle={{
                      fontWeight: "bold",
                      fontSize: 15,
                      marginBottom: 3,
                    }}
                    activeOpacity={1}
                    titleNumberOfLines={2}
                    underlayColor="transparent"
                    rippleColor="transparent"
                    left={(props) => (
                      <View
                        style={{
                          flexDirection: "row",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            marginHorizontal: 15,
                            color: ColorsApp.PRIMARY,
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {i + 1 + "º"}
                        </Text>
                        <View style={Styles.itemListView2}>
                          <Image
                            source={{ uri: item.image }}
                            style={Styles.itemListImage2}
                            resizeMode={"center"}
                          />
                        </View>
                      </View>
                    )}
                    right={(props) => (
                      <List.Icon
                        {...props}
                        icon={rightIcon}
                        style={{
                          alignSelf: "center",
                          opacity: 0.5,
                          alignSelf: "center",
                        }}
                      />
                    )}
                  />
                </TouchableScale>
              ))}
            </SafeAreaView>
          </ScrollView>

          <View>
            <FAB
              style={{ marginHorizontal: 50, marginBottom: 20, elevation: 0 }}
              label={Strings.ST122}
              icon="play"
              onPress={() => onClickStart(id, day)}
            />
          </View>
        </View>
      );
    } else {
      return <RestDay />;
    }
  }
}
