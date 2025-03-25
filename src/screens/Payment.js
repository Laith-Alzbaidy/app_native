import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import the useFocusEffect hook
import Home from "./Home";
import usePreferences from '../hooks/usePreferences';
import * as Linking from 'expo-linking';

import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import * as Updates from 'expo-updates';

import { useWindowDimensions } from "react-native";
import { getAllSubsecription,useCoupon,get_phone } from "../config/DataApp";
import ColorsApp from "../config/ColorsApp";
import {
  Button,
  TextInput,
  Title,
  Subheading,
  RadioButton,
  Card,
} from "react-native-paper";
import { getAuth } from 'firebase/auth';
import { check_user_subscription } from "../config/DataApp";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Payment(props) {

  
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [isPayed, setIsPayed] = useState(false);
  const [cardNumber, setCardNumber] = React.useState("");
  const [holderName, setHolderName] = React.useState("");
  const [coupon, setCoupon] = React.useState("");

  const [expiry, setExpiry] = React.useState("");
  const [subscription, setSubscription] = useState([]);
  const [cvv, setCvv] = React.useState("");
  const handlePayment = () => {
    console.log("Payment processing...");
  };
  const auth = getAuth();
	const [userId, setUserId] = useState(null);

	const fetchData = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                const response = await check_user_subscription(currentUser.uid);
                if (response.status == 200) {
                    setIsPayed(true);
                    setUserId(currentUser.uid)
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
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        fetchData();
      }, [])
    );
    const [NutritionSpecialistPhone,setNutritionSpecialistPhone]=useState(null);
    const[couchPhone,setchouchPhone]=useState(null);
    const fetchPhone = async () => {
    try {
      const phone = await get_phone();
      if (phone && phone.aaData && phone.aaData.length > 0 && phone.aaData[0].Nutrition_Specialist) {
       
        setNutritionSpecialistPhone(phone.aaData[0].Nutrition_Specialist);
        setchouchPhone(phone.aaData[0].Sports_Coach);
      }
    } catch (error) {
      console.error('An error occurred while fetching phone data:', error);
    }
  };
  
  useEffect(() => {
    fetchPhone();
  }, []); 


    const openWhatsAppChat = () => {
      const currentUser = auth.currentUser;
      const UserName = currentUser.displayName;
      const userEmail = currentUser.email;
    
      const selectedSubscriptionObject = subscription.find(
        (sub) => sub.id.toString() === selectedSubscription
      );
    
      const selectedSubscriptionName = selectedSubscriptionObject
        ? selectedSubscriptionObject.name
        : '';
    
      if (selectedSubscriptionName === '') {
        Alert.alert(Strings.chose_subsecription);
        return;
      }
    
      const message = `
        اسم العميل: ${UserName}
        البريد الألكتروني: ${userEmail}
        الأشتراك: ${selectedSubscriptionName}
      `;
    
      const phoneNumber = couchPhone; // Phone number with country code for Jordan
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
      Linking.openURL(whatsappUrl).catch((error) => {
        console.error("An error occurred:", error);
        Alert.alert("Error", `An error occurred while opening WhatsApp: ${error.message}`);
      });
    };
    


  useEffect(() => {
    getAllSubsecription().then((response) => {
      setSubscription(response.aaData);
    });
  }, []);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
 

  const selectedSubscriptionObject = subscription.find(
    (sub) => sub.id.toString() === selectedSubscription
  );
  const selectedPrice = selectedSubscriptionObject
    ? parseFloat(selectedSubscriptionObject.price)
    : 0;
  const handleSubscriptionChange = (value) => {
    setSelectedSubscription(value);
  };
 
  
  const insertCoupon = async () => {
    const currentUser = auth.currentUser;
    
    if (coupon !== '' && currentUser.uid) {
      try {
        const insert = await useCoupon(currentUser.uid, coupon);
        console.log(insert);
        if(insert.status==404){
          Alert.alert(Strings.invalid_code);

        }else if(insert.status==201){
          Alert.alert(Strings.code_used);

        }else if(insert.status==200){
          Updates.reloadAsync();

        }
      } catch (error) {
        // Handle error
        console.error('An error occurred:', error);
      }
    } else {
      Alert.alert(Strings.fill_coupon);
    }
  };
  


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "coupon", title: Strings.coupon },
  ]);

  useFocusEffect(
    useCallback(() => {
    }, [])
  );
  const tabBackgroundColors = {
    coupon: ColorsApp.SECONDARY,
  };
  const { theme, toggleTheme } = usePreferences();


  const CustomTabBar = (props) => {
    const { navigationState } = props;

    return (
      <SafeAreaView >
        <View
          style={[Styles.HomeScreen, { flexDirection: "row", padding: 10 }]}
        >
          {navigationState.routes.map((route, index) => {
            const tabBarBackgroundColor = tabBackgroundColors[route.key];
            const isActive = index === navigationState.index;

            const tabStyle = {
              backgroundColor: isActive
                ? ColorsApp.PRIMARY
                : ColorsApp.SECONDARY,
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              alignItems: "center",
              justifyContent: "center",
              flex: 1, // Equal width for both active and inactive tabs
              marginLeft: index === 0 ? 0 : -1, // Remove margin between tabs
            };

            return (
              <TouchableWithoutFeedback
                key={route.key}
                onPress={() => props.jumpTo(route.key)}
              >
                <View style={tabStyle}>
                  <Text>{route.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </SafeAreaView>
    );
  };
if(isPayed){
  return (
    <Home/>
  )
}else{
  return (
    <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      backgroundColor: theme === 'dark' ? 'black' : 'white'
    }}
  >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <Card
        style={{
          marginVertical: 10,
          borderWidth: 0,
          marginHorizontal: 15,
          padding: 5,
          backgroundColor: theme === 'dark' ? 'black' : 'white',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 25 }}>
          {`${selectedPrice.toFixed(2)} ${Strings.JOD}`}
        </Text>
      </Card>

      <View style={styles.subscriptionContainer}>
        <Title>{Strings.chose_subsecription}</Title>
        <RadioButton.Group
          onValueChange={handleSubscriptionChange}
          value={selectedSubscription}
        >
         {subscription.map((sub) => (
        <TouchableOpacity
          key={sub.id}
         
          onPress={() => handleSubscriptionChange(sub.id.toString())}
        >
          <Card  style={[
            styles.subscriptionCard,
            selectedSubscription === sub.id && styles.selectedCard,
          ]}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.radioButtonLabelLeft}>{sub.name}</Text>
                <Text style={styles.radioButtonLabelRight}>
                  ({sub.price}/{Strings.JOD})
                </Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
        </RadioButton.Group>
      </View>
    </ScrollView>

    <View style={{marginVertical:10,marginHorizontal:20 }}>
    <TextInput
  placeholder={Strings.coupon}
  value={coupon}
  onChangeText={text => setCoupon(text)} 
   mode="outlined"
  style={{ ...Styles.AuthInput, width: '100%', textAlign: 'center' }}
/>
<TouchableOpacity
  style={{  backgroundColor: theme === 'dark' ? 'black' : 'white',

}}
  onPress={() => openWhatsAppChat(Strings.contact_captin)}
>

  <Text style={{  color: theme === 'dark' ? 'white' : 'black',

}}>{Strings.contact_captin}</Text>
</TouchableOpacity>

</View>


<TouchableOpacity style={styles.button} onPress={insertCoupon}>
  <Text style={{ color: 'white' }}>{Strings.continue}</Text>
</TouchableOpacity>
  </View>
    
  );
}
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  expiryInput: {
    flex: 2,
    marginRight: 8,
  },
  cvvInput: {
    flex: 1,
    marginLeft: 8,
  },
  payButton: {
    marginTop: 16, // Add some margin at the top of the button
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginLeft: 8,
  },
  subscriptionContainer: {
    padding: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: ColorsApp.THIRD,
    padding: 10,
    marginHorizontal:15,
    borderRadius:8,
    marginVertical:10,

  },
  selectedCard: {
    borderColor:ColorsApp.THIRD, // Border color
    borderWidth: 1, // Border width
    padding: 2, // Add padding to create a small border
  },
  subscriptionCard:{
    marginVertical: 10,
  borderWidth: 0,
  marginHorizontal:10,
  padding: 5, // Add padding to the card for shadow effect
  backgroundColor: 'white', // Set card background color
  borderRadius: 8, // Set border radius for rounded corners
  shadowColor: '#000', // Set shadow color
  shadowOffset: { width: 0, height: 2 }, // Set shadow offset
  shadowOpacity: 0.3, // Set shadow opacity
  shadowRadius: 4, // Set shadow radius
  elevation: 5,
  }
});
