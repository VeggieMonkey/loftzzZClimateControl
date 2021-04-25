#include "Fan.h"
#include "esp8266-pins.h"
#include <SoftwareSerial.h>

#define FAN_PIN D8

#define SPEED "speed"
#define SYSTEM_MODE "systemMode"
#define THRESHOLD_TEMP "tempThreshold"
#define THRESHOLD_HUM "humThreshold"
#define THRESHOLD_CO2 "co2Threshold"
#define THRESHOLD_VOC "vocThreshold"

void Fan::setup(String fanName)
{ 
  Serial.print("Starting Fan controller... (" + fanName + ")");
    
  String prefix = "/fan/" + fanName + "/";

  keySystemMode = prefix + SYSTEM_MODE + "/";
  keySpeed = prefix + SPEED + "/";
  
  keyTempThreshold = prefix + THRESHOLD_TEMP + "/";
  keyHumThreshold = prefix + THRESHOLD_HUM + "/";
  keyCo2Threshold = prefix + THRESHOLD_CO2 + "/";
  keyVoCThreshold = prefix + THRESHOLD_VOC + "/";

  pinMode(FAN_PIN, OUTPUT);
  Serial.println(" complete!");

  analogWriteRange(100); // to have a range 1 - 100 for the fan
  analogWriteFreq(10000);  
}

// don't use with relay
void Fan::modifySpeed(int fanSpeedPercent) {
//  analogWrite(FAN_PIN, fanSpeedPercent);
  on();
}

void Fan::on()
{
  Serial.println("Turn fan on");
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're usong Normally Closed configuration send HIGH signal)

//  analogWrite(FAN_PIN, fanSpeedPercent);
  digitalWrite(FAN_PIN, LOW);
//  digitalWrite(FAN_PIN, HIGH);  
  //  Serial.println("Current flowing");
}

void Fan::off()
{
  Serial.println("Turn fan off");
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're using Normally Closed configuration send HIGH signal)
  digitalWrite(FAN_PIN, HIGH);
//  digitalWrite(FAN_PIN, LOW);
//  analogWrite(FAN_PIN, 0);
  //  Serial.println("Current not flowing");
}
