import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import LanguageContext from "../languages/LanguageContext";

const Bmi = ({ selectedValues, ...props }) => {
    console.log("@@@@@@@")
console.log(selectedValues)
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100; // convert height from cm to meters
      const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{Strings.prperty}</Text>
        <Text style={styles.headerText}>{Strings.value}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{Strings.the_wieght} ({Strings.kg}):</Text>
        <TextInput
          style={[styles.input, { width: '48%' }]} // Set width to 48% for the input
          placeholder="Enter weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{Strings.the_hight} ({Strings.cm}):</Text>
        <TextInput
          style={[styles.input, { width: '48%' }]} // Set width to 48% for the input
          placeholder="Enter height"
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
      </View>

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Your BMI:</Text>
          <Text style={styles.result}>{bmi}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    padding: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Bmi;
