# ESP8266

## How to run

Open controller.ino in arduino IDE.

Add this snippit to a new file here called `Secrets.h`

```
#define SECRET_WIFI_SSID ""
#define SECRET_WIFI_PASS ""
#define SECRET_FIREBASE_API_KEY ""
#define SECRET_FIREBASE_USER_PASSWORD ""
#define SECRET_FIREBASE_USER_EMAIL ""
#define SECRET_FIREBASE_HOST ""
#define SECRET_FIREBASE_PROJECT_ID ""
```

## Board configuration

Co2 - CCS811

VCC - 3v
GND - g
SCL - d1
SDA - d2
WAK - g

## DB structure

firebase function to process last 24 hours.

```
object logs:
  long timestamp:
    {
      string sensorName: int reading
    }
```
