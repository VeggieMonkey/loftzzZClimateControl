import * as React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const OnOrOffButton = ({isFanOn}:{isFanOn:boolean}) => {
  return (
    <Button
    title={isFanOn ? "On" : "Off"}
    color="#f194ff"
    //onPress={() => }
  />
  )
}

const TabTwoScreen = () => {
  const [fanSpeed, setFanSpeed] = React.useState(50)
const handleFanSpeedChange = (speed:number) => {
  console.log('Fan speed', speed)
  setFanSpeed(speed)
}


/* Fan onOr off?
if fan speed = 0 return OFF



*/

  return (
    <View style={styles.container}>
      <Text style={styles.fanText}>Fan control</Text>
      <Slider
        style={{width: 250, height: 40}}
        minimumValue={0}
        maximumValue={100}
        step={10}
        onSlidingComplete={handleFanSpeedChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
      />

      <Text style={styles.fanText}>Fan speed: {fanSpeed}%</Text>
      <OnOrOffButton isFanOn={fanSpeed === 0 ? false : true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '100',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fanText: {
    fontSize: 40,
    fontWeight: '200',
  },
});
export default TabTwoScreen