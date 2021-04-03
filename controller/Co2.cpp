#include <Wire.h>   // I2C library
#include "ccs811.h" // CCS811 library
#include "Co2.h"
#include <SoftwareSerial.h>

// Wiring for ESP8266 NodeMCU boards: VDD to 3V3, GND to GND, SDA to D2, SCL to D1, nWAKE to D3 (or GND)
CCS811 ccs811(0); // nWAKE on D3

void Co2::setup()
{

  // Enable I2C
  Wire.begin();

  // Enable CCS811
  ccs811.set_i2cdelay(50); // Needed for ESP8266 because it doesn't handle I2C clock stretch correctly
  bool ok = ccs811.begin();
  if (!ok)
    Serial.println("CCS811 setup: begin FAILED");

  // Print CCS811 versions
  Serial.print("CCS811 setup: hardware    version: ");
  Serial.println(ccs811.hardware_version(), HEX);
  Serial.print("CCS811 setup: bootloader  version: ");
  Serial.println(ccs811.bootloader_version(), HEX);
  Serial.print("CCS811 setup: application version: ");
  Serial.println(ccs811.application_version(), HEX);
  
  // Start measuring
  ok = ccs811.start(CCS811_MODE_1SEC);
  if (!ok)
    Serial.println("CCS811 start FAILED");

}

void Co2::read(int *val1, int *val2)
{
  // Read
  uint16_t eco2, etvoc, errstat, raw;
  ccs811.read(&eco2, &etvoc, &errstat, &raw);

  // Print measurement results based on status
  if (errstat == CCS811_ERRSTAT_OK)
  {
    *val1 = eco2;
    *val2 = etvoc;

//    Serial.print("CCS811: ");
//    Serial.print("eco2=");
//    Serial.print(val1);
//    Serial.print(" ppm  ");
//
//    Serial.print("etvoc=");
//    Serial.print(val2);
//    Serial.print(" ppb  ");
//    Serial.println();
  }
  else if (errstat == CCS811_ERRSTAT_OK_NODATA)
  {
    Serial.println("CCS811: waiting for (new) data");
  }
  else if (errstat & CCS811_ERRSTAT_I2CFAIL)
  {
    Serial.println("CCS811: I2C error");
  }
  else
  {
    Serial.print("CCS811: errstat=");
    Serial.print(errstat, HEX);
    Serial.print("=");
    Serial.println(ccs811.errstat_str(errstat));
  }
}
