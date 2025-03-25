import React, { useState,useEffect } from 'react';
import { View, Image, SafeAreaView, Alert } from 'react-native';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import Languages from "../languages";
import AppLoading from '../components/InnerLoading';

import LanguageContext from "../languages/LanguageContext";
import usePreferences from "../hooks/usePreferences";
import { getAuth } from 'firebase/auth';
import { sendMessage } from '../config/DataApp';
export default function Send_message(props) {
  const [message, setMessage] = useState(null);
  const { navigation } = props;
  const {theme, toggleTheme} = usePreferences();

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const auth = getAuth();
	const [userId, setUserId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
        try {
                setUserId(currentUser.uid)
                setIsLoaded(true)
            } 
        catch (error) {
            console.error("An error occurred:", error);
        }
      }
    }


useEffect(() => {
    fetchData();
}, []);


const handleSendMessage = async () => {
  setIsLoaded(false)
  try {
    if (userId && message) {
      const response = await sendMessage(userId, message);

   if(response.status==200){
    props.navigation.navigate("all_message");
   }
      console.log(response);
      console.log('Message sent:', message);
      setMessage(''); 
      setIsLoaded(true);
    }else {
      Alert.alert(Strings.ST104,Strings.ST33)
    }
  } catch (error) {
    
    console.error('An error occurred:', error.message);
    // Handle the error, display an error message to the user, etc.
  }
};

if (!isLoaded) {

  return (
 
      <View style={{marginTop:50}}>
        <AppLoading/>
        </View>
 
       );
 
    }else{
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: '55%', // Adjust to take 2/5 of the screen
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <Image
          source={require('../../assets/splash.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '90%', // Adjust to take 2/5 of the screen
          }}
        />
      </View>

      <View style={{ flex: 3,marginHorizontal:10 }}>
        <Title>{Strings.message_content}</Title>
        <TextInput
          placeholder=""
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
            backgroundColor: theme === 'dark' ? 'black' : 'white',
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
        <Button
          mode="contained"
          onPress={handleSendMessage}
          disabled={!message}
        >
          {Strings.ST96}
        </Button>
      </View>
    </View>
  </SafeAreaView>
  );
}
}
