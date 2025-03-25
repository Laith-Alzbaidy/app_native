import React from "react";
import { View, I18nManager } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { map } from "lodash";
import Styles from "../config/Styles";
import TouchableScale from "react-native-touchable-scale";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function DietDays(props, workouts) {
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const { Number, Diets } = props;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const totalDays = Array.from(Array(Number).keys());

  const navigation = useNavigation();

  const onChangeScreen = (id) => {
    const dayName = Object.keys(Diets.data)[id];
    const dayData = Diets.data[dayName]
    navigation.navigate("dietPlanCard", { dayName, dayData });
  };

  return (
    <View style={{ marginVertical: 10, marginBottom: 40 }}>
      {map(totalDays, (i) => (
        <TouchableScale
          key={i}
          activeOpacity={1}
          onPress={() => onChangeScreen(i)}
          activeScale={0.98}
          tension={100}
          friction={10}
        >
          <View style={Styles.DayList}>
            <Text style={Styles.DayListText}>
              {Strings.ST90 + " " + (i + 1)}
            </Text>
            <Icon name={rightIcon} style={Styles.DayListIcon} />
          </View>
        </TouchableScale>
      ))}
    </View>
  );
}
