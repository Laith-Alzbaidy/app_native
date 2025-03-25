import React, { useRef, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
} from "react-native";
import ColorsApp from "../config/ColorsApp";
import Styles from "../config/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import ProgressBar from "react-native-animated-progress";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { questions } from "../config/Questions";

export default function QuizComponent({ onSelectValue, ...props }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textAnswers, setTextAnswers] = useState({});
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId, answerText) => {
    const newAnswers = [...answers];
    const questionAnswers = newAnswers.find(
      (a) => a.id === currentQuestion.id
    ) || { id: currentQuestion.id, answers: [] };

    if (currentQuestion.multiple) {
      const answerIndex = questionAnswers.answers.findIndex(
        (a) => a.answerId === answerId
      );
      if (answerIndex > -1) {
        questionAnswers.answers.splice(answerIndex, 1);
      } else {
        questionAnswers.answers.push({ answerId, answerText });
      }
    } else {
      questionAnswers.answers = [{ answerId, answerText }];
    }

    const questionIndex = newAnswers.findIndex(
      (a) => a.id === currentQuestion.id
    );
    if (questionIndex > -1) {
      newAnswers[questionIndex] = questionAnswers;
    } else {
      newAnswers.push(questionAnswers);
    }

    setAnswers(newAnswers);
  };

  const handleTextInputChange = (text) => {
    setTextAnswers({ ...textAnswers, [currentQuestion.id]: text });
  };

  const handleNextQuestion = () => {
    if (currentQuestion.isText && !textAnswers[currentQuestion.id]) return; // Prevent moving forward if text input is empty for isText questions

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const formattedAnswers = answers.map((answer) => ({
        questionId: answer.id,
        questionText: questions.find((q) => q.id === answer.id)?.text,
        questionAnswers: answer.answers.map((a) => a.answerText).join(", "),
      }));

      // Add text answers to formattedAnswers
      Object.keys(textAnswers).forEach((questionId) => {
        const question = questions.find((q) => q.id === parseInt(questionId));
        if (question) {
          formattedAnswers.push({
            questionId: question.id,
            questionText: question.text,
            questionAnswers: textAnswers[questionId],
          });
        }
      });

      let answersText = "";
      formattedAnswers.forEach((item) => {
        answersText += `${item.questionText}?: ${item.questionAnswers}; `;
      });

      onSelectValue(answersText);
      props.navigation.replace("register");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderAnswers = () => {
    const questionAnswers =
      answers.find((a) => a.id === currentQuestion.id)?.answers || [];
  
    if (currentQuestion.isText) {
      return (
        <View style={[Styles.Customecard, Styles.cardContent]}>
          <TextInput
            placeholder="أدخل إجابتك هنا"
            value={textAnswers[currentQuestion.id] || ""}
            onChangeText={(text) =>
              setTextAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: text,
              }))
            }
            keyboardType={currentQuestion.isNumber?"number-pad": "default"}
            style={{
              borderColor: ColorsApp.PRIMARY,
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              fontSize: 16,
              textAlign: 'center'
            }}
          />
        </View>
      );
    }
  
    return currentQuestion.answers.map((answer) => (
      <View key={answer.id} style={[Styles.Customecard, Styles.cardContent]}>
        <TouchableOpacity
          onPressIn={() =>
            Animated.spring(scaleValue, {
              toValue: 0.98,
              useNativeDriver: true,
            }).start()
          }
          onPressOut={() =>
            Animated.spring(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
            }).start()
          }
          onPress={() => handleAnswerSelect(answer.id, answer.text)}
          activeOpacity={1}
          style={[
            { transform: [{ scale: scaleValue }] },
            questionAnswers.some((a) => a.answerId === answer.id)
              ? Styles.selectedOption
              : null,
          ]}
        >
          <ImageBackground
            source={{ uri: answer.image || "your_default_image_uri_here" }}
            style={Styles.card5_background}
            imageStyle={{ borderRadius: 8 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
              style={Styles.card5_gradient}
            >
              <Row>
                <Col
                  size={100}
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Styles.optionContainer}>
                      <Text numberOfLines={2} style={Styles.card1_title2}>
                        {answer.text}
                      </Text>
                    </View>
                    {questionAnswers.some((a) => a.answerId === answer.id) && (
                      <View
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          width: 20,
                          height: 20,
                          borderRadius: 20,
                          backgroundColor: "#C65A42",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="check" size={12} color="white" />
                      </View>
                    )}
                  </View>
                </Col>
              </Row>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    ));
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ProgressBar
        progress={((currentQuestionIndex + 1) / questions.length) * 100}
        height={5}
        backgroundColor={ColorsApp.PRIMARY}
        style={{ marginVertical: 10 }}
      />
      <Text style={{ textAlign: "center", marginVertical: 1 }}>
        {currentQuestionIndex + 1}/{questions.length}
      </Text>
      <Text style={{ textAlign: "center", marginVertical: 1 }}>
        {currentQuestion.text}
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
      >
        {renderAnswers()}
      </ScrollView>

      <View
        style={[
          Styles.containerButton2,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
          },
        ]}
      >
        <Button
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          السابق
        </Button>
        <Button
          onPress={handleNextQuestion}
          disabled={
            (!answers.find((a) => a.id === currentQuestion.id) ||
              answers.find((a) => a.id === currentQuestion.id)?.answers
                ?.length === 0) &&
            !currentQuestion.multiple &&
            !currentQuestion.isText
          }
        >
          {currentQuestionIndex === questions.length - 1 ? "تسجيل" : "التالي"}
        </Button>
      </View>
    </View>
  );
}
