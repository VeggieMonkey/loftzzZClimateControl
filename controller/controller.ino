#include "Storage.h"         // Wifi
#include "FirebaseHelpers.h" // Store data
#include "Co2.h"             //
#include "Temp.h"            // AM2302 DHT22
#include "Fan.h"             //

class MainSystem
{
public:
  MainSystem();
  void overTemperatureThreshold();
  void underTemperatureThreshold();
  void adjustToOnlineSettings();
  void setupThresholds();
  int getFan1Speed(); // get running speed
  int systemMode = 1; // automatic

  // we will initialize these values from firebase:
  int fan1TempThreshold;
  int fan1HumThreshold;
  int fan1VoCThreshold;
  int fan1Co2Threshold;
  
  Storage storage;
  FirebaseHelpers firebaseHelpers;
  Co2 co2;
  Temp temp;
  Fan fan1;

  void init();
};
MainSystem::MainSystem()
{
  Serial.println("---------------------");
};
void MainSystem::setupThresholds(){
  fan1TempThreshold = firebaseHelpers.readInt(fan1.keyTempThreshold);
  fan1HumThreshold = firebaseHelpers.readInt(fan1.keyTempThreshold);
  fan1VoCThreshold = firebaseHelpers.readInt(fan1.keyTempThreshold);
  fan1Co2Threshold = firebaseHelpers.readInt(fan1.keyTempThreshold);
}
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
  fan1.setup("fan1");

  setupThresholds();
}

MainSystem mainSystem;

int MainSystem::getFan1Speed() {
  // if fan is not on in firebase
  return firebaseHelpers.readInt(fan1.keySpeed);
}

// this is only for automatic control mode
void MainSystem::overTemperatureThreshold()
{
  int fanSpeed = getFan1Speed();

  // if fan is not on in firebase
  if (fanSpeed == 0) {
    // set it on in firebase
    firebaseHelpers.saveInt(fan1.keySpeed, 100);
    // turn it on physically
    fan1.on();
  }
}

void MainSystem::underTemperatureThreshold()
{
  if (getFan1Speed() == 100) {
    firebaseHelpers.saveInt(fan1.keySpeed, 0);
    fan1.off();
  } 
}

void MainSystem::adjustToOnlineSettings() {
  int fanSpeed = getFan1Speed();
  Serial.print("Manual mode, using online speed: ");
  Serial.println(fanSpeed);
  if (fanSpeed == 0) {
    fan1.off();
  } else {
    fan1.on();
  }
}

/*
*
*  Main:
*/
void setup()
{
  Serial.begin(115200); // esp8266
  mainSystem.init();
}

// considerations for a more advanced threshold system:
//int debounce = 2 * 60 * 1000; // change state after x mins at threshold
//double debounceCounter = 0;
// int tempLowThreshold = 21; // turn off below 20
// int tempHighThreshold = 20; // turn on above 20

void loop()
{
  int co2_val, voc_val;
  mainSystem.co2.read(&co2_val, &voc_val);

  int temp_val, hum_val;
  mainSystem.temp.read(&temp_val, &hum_val);

  int nettime = mainSystem.storage.getTime();
  Serial.print("System time: ");
  Serial.println(nettime);  
  if (nettime < 36000) {
    mainSystem.storage.setupTime();
    int nettime = mainSystem.storage.getTime();
  }
  
  mainSystem.firebaseHelpers.saveLog(nettime, co2_val, voc_val, temp_val, hum_val);

  // read mode from firebase each cycle, to be sure we catch any app changes
  int systemMode = mainSystem.firebaseHelpers.readInt(mainSystem.fan1.keySystemMode);
//  Serial.print("Reading systemMode value: ");
//  Serial.println(systemMode);
  
  // automatic mode
  if (systemMode == 1)
  {
    Serial.println("Checking environment... (automatic mode)");
    
    Serial.print("Current temp: ");
    Serial.println((String) temp_val);
    Serial.println("Threshold: " + (String) mainSystem.fan1TempThreshold);

    if (temp_val > mainSystem.fan1TempThreshold)
    {
      mainSystem.overTemperatureThreshold();
    }
    else
    {
      mainSystem.underTemperatureThreshold();
    }
  }

  // manual mode
  if (systemMode == 2)
  {
    // read from firebase each cycle
    // to be sure we catch any changes from the app
    mainSystem.adjustToOnlineSettings();    
  }

  delay(10 * 1000);
}
