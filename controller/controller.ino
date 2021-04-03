#include "Storage.h"
#include "FirebaseHelpers.h"
#include "Co2.h"

class MainSystem
{
public:
  MainSystem();
  Storage storage;
  FirebaseHelpers firebaseHelpers;
  Co2 co2;

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
  int val1, val2;
  mainSystem.co2.read(&val1, &val2);
  Serial.print("CCS811: ");
  Serial.print("eco2=");
  Serial.print(val1);
  Serial.print(" ppm  ");

  Serial.print("etvoc=");
  Serial.print(val2);
  Serial.print(" ppb  ");
  Serial.println();
  
  mainSystem.firebaseHelpers.saveLog(mainSystem.storage.getTime(), val1, val2);
  
  delay(20000);
}
