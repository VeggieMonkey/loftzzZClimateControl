#include "Fan.h"
#include "esp8266-pins.h"
#include <SoftwareSerial.h>

#define FAN_PIN D7

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
  keySpeed= prefix + SPEED + "/";
  
  keyTempThreshold = prefix + THRESHOLD_TEMP + "/";
  keyHumThreshold = prefix + THRESHOLD_HUM + "/";
  keyCo2Threshold = prefix + THRESHOLD_CO2 + "/";
  keyVoCThreshold = prefix + THRESHOLD_VOC + "/";

  pinMode(FAN_PIN, OUTPUT);
  Serial.println(" complete!");
}

void Fan::on()
{
  Serial.println("Turn fan on");
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're usong Normally Closed configuration send HIGH signal)
  digitalWrite(FAN_PIN, LOW);
  //  Serial.println("Current flowing");
}

void Fan::off()
{
  Serial.println("Turn fan off");
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're using Normally Closed configuration send HIGH signal)
  digitalWrite(FAN_PIN, HIGH);
  //  Serial.println("Current not flowing");
}
