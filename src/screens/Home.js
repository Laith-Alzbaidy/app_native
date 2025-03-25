import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook
import Heading from '../components/Heading';
import { Text } from 'react-native-paper';
import LatestWorkouts from '../components/LatestWorkouts';
import ExercisesLibrary from '../components/ExercisesLibrary';
import Goals from '../components/Goals';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import Levels from '../components/Levels';
import LatestDiets from '../components/LatestDiets';
import GoalFood from '../components/GoalFood';
import GoalWorkout from '../components/GoalWorkout';
import Payment from './Payment';
import AppLoading from '../components/InnerLoading';
import { check_user_subscription } from '../config/DataApp';
import { getAuth } from 'firebase/auth';
export default function Home(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };
  const auth = getAuth();
  const [userId, setUserId] = useState(null);
  const [isPayed, setIsPayed] = useState(null);

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
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isPayed]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [isPayed])
  );
  if (isPayed == null) {

    return (

      <View style={{ marginTop: 50 }}>
        <AppLoading />
      </View>

    );

  }


  // if (isPayed == false) {
  //   return <Payment />;
  // } else {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={Styles.HomeScreen}>
            <GoalWorkout />
            <>
              <GoalFood />
            </>
            <Heading title={'أحدث الأخبار'} button={() => onChangeScreen('blog')} />
            <LatestWorkouts />

            {/* <Heading title={Strings.ST22} button={() => onChangeScreen('goals')} />
            <Goals /> */}

            {/* <Heading title={Strings.ST24} button={() => onChangeScreen('levels')} />
            <Levels />
 */}
            <ExercisesLibrary />
            {/* <Heading title={Strings.ST47} button={() => onChangeScreen('diets')} />
            <LatestDiets /> */}

          </View>
        </SafeAreaView>
      </ScrollView>
    );
  // }
}
