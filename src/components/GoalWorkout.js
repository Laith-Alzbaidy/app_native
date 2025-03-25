import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground } from 'react-native';
import Styles from '../config/Styles';
import { map } from 'lodash';
import Loading from './InnerLoading';
import { getWorkoutByGoal } from "../config/DataApp";
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import Heading from "./Heading";
import TouchableScale from 'react-native-touchable-scale';
import { Paragraph, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LevelRate from './LevelRate';
import { getAuth } from 'firebase/auth';

export default function GoalWorkout() {
  const auth = getAuth();
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;

  const Strings = Languages[language].texts;

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [workoutId, setWorkoutId] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const [program, setProgram] = useState(null);

  const onChangeScreen = (id, title) => {
    navigation.navigate('workoutdetails', { id });
  };

  const fetchData = async () => {
    setUserId(auth.currentUser.uid);
    if (userId) {
      try {
        const response = await getWorkoutByGoal(userId);

        if (response.aaData && response.aaData.length > 0 && response.status == 200) {
          setWorkoutId(response.aaData[0]['workout_id']);
        }
        else {

        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const fetchWorkoutData = async () => {
    const res = await getUserData(userId);

    const workouts = JSON.parse(res.workout);
    const table = JSON.parse(workouts.choices[0].message.content);
    console.log('askejhfeeruerihgeriuhslkfjslkdfneijfeiuf', workouts.choices);
    setProgram(table);
  };

  useEffect(() => {
    fetchData();
    fetchWorkoutData(); 

  }, [userId,workoutId,isLoaded]);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoaded(false);
      fetchData();
      fetchWorkoutData(); 
    }, [])
  );

  // if (!isLoaded) {
  //   return (
  //     <Loading />
  //   );
  // }

  return (
    // <View style={{ marginTop: 10 }}>
    //   <ScrollView
    //     style={{ width: '100%' }}
    //     contentContainerStyle={{ flex: 1, paddingRight: 0 }}
    //     horizontal={true}
    //     showsHorizontalScrollIndicator={false}
    //   >

    //       <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
    //         <ImageBackground  source={require("../../images/welcome.jpg")} style={Styles.card1_goal} imageStyle={{ borderRadius: 8 }}>
    //           <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card1_gradient}>
    //             {item.rate ? <View style={[Styles.card1_viewicon, { flexDirection: 'row' }]}><LevelRate rate={item.rate} /></View> : null}
    //             <Paragraph style={Styles.card1_subtitle}>{item.level}</Paragraph>
    //             <Text numberOfLines={2} style={Styles.card1_title}>{item.title}</Text>
    //           </LinearGradient>
    //         </ImageBackground>
    //       </TouchableScale>
    //   </ScrollView>
    // </View>

    <View style={{ marginRight: 20 }}>
            <Heading title={Strings.you_goal_workout} />
    <TouchableScale
      style={{ borderRadius: 8, marginVertical: 10 }}
      activeOpacity={1}
      onPress={() => navigation.navigate("workoutdetails", { program })}
      activeScale={0.98}
      tension={100}
      friction={10}
    >
      <ImageBackground
              source={require("../../images/welcome.jpg")}
        style={Styles.card1_goal}
        imageStyle={{ borderRadius: 8 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
          style={Styles.card1_gradient}
        >
          <View style={Styles.card4_title}>
            <Text style={{ fontSize: 20, color: "#fff" }}>
              الأسبوع الأول
            </Text>
          </View>
          <Text numberOfLines={1} style={Styles.card4_title}></Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableScale>
  </View>

  );
}
