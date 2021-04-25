#pragma once
#include <SoftwareSerial.h> // for String usage

class Fan
{
public:
  void setup(String fanName);
  void on();
  void off();
  void modifySpeed(int fanSpeedPercent);

  // firebase keys:
  String keySystemMode; // 1 = automatic, 2 = manual
  String keySpeed;      // 0 off, 100 full power
  
  String keyTempThreshold;  
  String keyCo2Threshold;  
  String keyVoCThreshold;  
  String keyHumThreshold;
};
