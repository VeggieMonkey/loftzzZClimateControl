# ESP8266

The chip has a ESP 12F.

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

Select 'Generic ESP8266 Module'
The baud rate is 115200.

## OTA

### Linux

If you cannot find the device in the ports list, try and open the port:

```
 sudo iptables -A INPUT -p udp --dport 8266 -j ACCEPT
```

To check if you can see the devices on the network, run either:

```
avahi-browse -a
mdns-scan
```

### Co2 - CCS811

```
VCC -> 3v
GND -> g
SCL -> d1
SDA -> d2
WAK -> g
```

### Temp - DHT22

```
VCC -> 3v
GND -> g
DAT -> D3
```

### Fan - Fan

```
S -> D8
+ -> 3v
- -> g
```

## DB structure

firebase function to process last 24 hours.

```
object logs:
  long timestamp:
    {
      string sensorName: int reading
    }
```
