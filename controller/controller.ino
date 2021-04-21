#include "Storage.h"        // Wifi
#include "FirebaseHelpers.h"// Store data
#include "Co2.h"            // 
#include "Temp.h"           // AM2302 DHT22
#include "Fan.h"            // 

class MainSystem
{
public:
  MainSystem();
  Storage storage;
  FirebaseHelpers firebaseHelpers;
  Co2 co2;
  Temp temp;
  Fan fan;

  void init();
};
MainSystem::MainSystem()
{
  Serial.println("---------------------");
};

// doing this stuff here, because the constructor
// is called before Serial is initialized
void MainSystem::init()
{
  Serial.println("---------------------");
  Serial.println("Initializing main system.");

  storage.setupWifi();
  firebaseHelpers.setupFirebase();
  storage.setupTime();
  
  co2.setup();
  temp.setup();
  fan.setup();  
}

MainSystem mainSystem;

/*
*
*  Main:
*/
void setup()
{
  Serial.begin(115200); // esp8266
  mainSystem.init();
}

void loop()
{
  int co2_val, voc_val;
  mainSystem.co2.read(&co2_val, &voc_val);

  int temp_val, hum_val;
  mainSystem.temp.read(&temp_val, &hum_val);

  mainSystem.firebaseHelpers.saveLog(mainSystem.storage.getTime(), co2_val, voc_val, temp_val, hum_val);
  
  delay(60 * 1000);
}
