import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const temp = 20
  const humidity = 41
  const co2Ppm = 450
  return (
    <View style={styles.container}>
      <Text style={styles.measurement}>{temp}<Text style={styles.tempUnit}>°C </Text></Text>
      <Text style={styles.measurement}>{humidity}<Text style={styles.tempUnit}>% </Text></Text>
      <Text style={styles.measurement}>{co2Ppm}<Text style={styles.unit}> ppm</Text></Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 125,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  measurement: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    fontSize: 80,
    fontWeight: '200',
  },
  tempUnit: {
    fontSize: 80,
    fontWeight: '100',
  },
  unit: {
    fontSize: 50,
    fontWeight: '100',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
