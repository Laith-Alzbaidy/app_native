import React, { useState, useEffect } from "react";
import { ScrollView, View, SafeAreaView, Modal, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { FlatList } from "react-native";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import TouchableScale from "react-native-touchable-scale";
import { getAuth } from "firebase/auth";
import AppLoading from "../components/InnerLoading";
import { get_all_message } from "../config/DataApp";
import ColorsApp from "../config/ColorsApp";
import Icon from "react-native-vector-icons/FontAwesome"; // You can replace this with the appropriate icon library

export default function All_message(props) {
  const auth = getAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedResponseMessage, setSelectedResponseMessage] = useState("");

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [userId, setUserId] = useState(null);
  const [allMessage, setAllmessage] = useState([]);

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (message, response) => {
    setSelectedMessage(message);
    setSelectedResponseMessage(response);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMessage("");
    setSelectedResponseMessage("");
  };

  const fetchData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        setUserId(currentUser.uid);
        setIsLoaded(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getallMessage = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const response = await get_all_message(currentUser.uid);
        setAllmessage(response.aaData);
        setIsLoaded(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    getallMessage();
  }, [userId]);

  const renderItem = ({ item }) => (
    <TouchableScale
      activeOpacity={1}
      onPress={() => onClickItem(item.message, item.response_message)} // Pass the message content here
      activeScale={0.98}
      tension={100}
      friction={10}
    >
      <Card
        style={{
          marginVertical: 15,
          borderWidth: 1,
          borderColor: "gray",
          padding: 25,
          backgroundColor:
            item.response_message !== null ? ColorsApp.PRIMARY : "white",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {item.message}
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
            {item.response_message !== null && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: "#C65A42",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Icon name="check" size={15} color="white" />
              </View>
            )}
          </View>
        </View>
      </Card>
    </TouchableScale>
  );

  if (!isLoaded) {
    return (
      <View style={{ marginTop: 50 }}>
        <AppLoading />
      </View>
    );
  } else {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={Styles.ContentScreen}>
            <FlatList
              data={allMessage}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

<Modal
  visible={isModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={closeModal}
>
  <View style={Styles.modalCenteredContainer}>
    <View style={Styles.modalCenteredContent}>
      
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5,fontSize:20 }}>{Strings.message}</Text>
          <Text style={{fontSize:18}}>{selectedMessage}</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5,fontSize:20 }}>
            {Strings.response_message}
          </Text>
          <Text style={{fontSize:18}}>{selectedResponseMessage}</Text>
        </View>
      </View>
      <View style={{ justifyContent: "flex-end", marginTop: 20 }}>
        <Button
          mode="contained"
          onPress={closeModal}
        >
          {Strings.close}
        </Button>
      </View>
    </View>
  </View>
</Modal>

          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
