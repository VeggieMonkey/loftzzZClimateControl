#include "Fan.h"
#include "esp8266-pins.h"
#include <SoftwareSerial.h>

#define FAN_PIN D7

void Fan::setup()
{
  Serial.print("Starting Fan controller...");
  pinMode(FAN_PIN, OUTPUT);
  Serial.println(" complete!");
  on();
  delay(1000);
  off();
  delay(1000);
  on();
  delay(1000);
  off();
}

void Fan::on() {
  Serial.println("Turn on");
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're usong Normally Closed configuration send HIGH signal)
  digitalWrite(FAN_PIN, LOW);
  Serial.println("Current flowing");
}

void Fan::off() {
  Serial.println("Turn HIGH");
  // Normally Open configuration, send LOW signal to let current flow
  // (if you're usong Normally Closed configuration send HIGH signal)
  digitalWrite(FAN_PIN, LOW);
  Serial.println("Current not flowing");
}
