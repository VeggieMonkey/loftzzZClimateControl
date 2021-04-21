#include "DHT.h"
#include "Temp.h"
#include <SoftwareSerial.h>
#include "esp8266-pins.h"

#define DHT_PIN D3
#define DHT_TYPE DHT22

// create an instance of DHT sensor
DHT dht(DHT_PIN , DHT_TYPE);

void Temp::setup()
{
  Serial.print("Starting DHT 22...");
  dht.begin();
  Serial.println(" complete!");
  
}

void Temp::read(int *val1, int *val2) {
  // use the functions which are supplied by library.
  float h = dht.readHumidity();
  
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  // print the result to Terminal
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.println(" *C ");

  *val1 = t;
  *val2 = h;
}
