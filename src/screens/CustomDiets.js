import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getDietsByUser } from "../config/DataApp";
import { map } from 'lodash';
import AppLoading from '../components/InnerLoading';
import TouchableScale from 'react-native-touchable-scale';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LoadMoreButton from '../components/LoadMoreButton';
import NoContentFound from '../components/NoContentFound';
import Heading from '../components/Heading'; // Make sure to import Heading if it's a component in your project
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();

export default function CustomDiets(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const navigation = useNavigation();

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id, title) => {
    props.navigation.navigate('dietdetails', { id, title });
  };

  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);

    getDietsByUser(auth.currentUser.uid, page + 1).then((response) => {
      if (!items) {
        setItems(response);
        setLoading(false);
      } else {
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);
    });
  };

  const renderButton = () => {
    return (
      <LoadMoreButton Indicator={loading} showButton={showButton} Items={items} Num={5} Click={() => loadMore()} />
    );
  };

  useEffect(() => {
    getDietsByUser(auth.currentUser.uid).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={Styles.ContentScreen}>
            {map(items, (program, index) => {
              const baseUrl = 'https://appadmin.mohannad-theeb.com/images/'; // Replace with your actual base URL
              const categoryImage = program.category_image; // Replace with the correct property from your program object
              console.log("@@@")

              console.log(categoryImage)
              const imageSource = categoryImage ? { uri: `${baseUrl}${categoryImage}` } : require('../../images/food.jpg');
              return (
                <View key={index} style={{ marginRight: 20 }}>
                  <Heading title={Strings.you_goal_diet} />
                  <TouchableScale
                    style={{ borderRadius: 8, marginVertical: 10 }}
                    activeOpacity={1}
          onPress={() => navigation.navigate('dietdetailsCard', { program })}
                    activeScale={0.98}
                    tension={100}
                    friction={10}
                  >
                    <ImageBackground
                      source={imageSource}
                      style={Styles.card1_goal}
                      imageStyle={{ borderRadius: 8 }}
                    >
                      <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card1_gradient}>
                        <View style={Styles.card4_title}>
                          <Text style={{ fontSize: 20, color: '#fff' }}>{program.name}</Text>
                        </View>
                        <Text numberOfLines={1} style={Styles.card4_title}></Text>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableScale>
                </View>
              );
            })}
            {renderButton()}
            <NoContentFound data={items} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
