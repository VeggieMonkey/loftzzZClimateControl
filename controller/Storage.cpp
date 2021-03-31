#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include "Storage.h"
#include "Secrets.h"

WiFiUDP ntpUDP;
const long utcOffsetInSeconds = 7200; // utc+1=3600, utc+2=7200 (daylight savings)
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

void Storage::setupWifi()
{
  WiFi.begin(SECRET_WIFI_SSID, SECRET_WIFI_PASS);
  Serial.println(" ");
  Serial.println(" ");
  Serial.print("Initializing Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.print(" complete! (");
  Serial.print(WiFi.localIP());
  Serial.println(")");
  Serial.println(" ");
}

void Storage::setupTime()
{
  timeClient.begin();
  timeClient.update();
}

long Storage::getTime()
{
  return timeClient.getEpochTime();
}
