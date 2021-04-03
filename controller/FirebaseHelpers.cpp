#include <ESP8266WiFi.h>
//#include <Firebase_ESP_Client.h>

#include "FirebaseHelpers.h"
#include "Secrets.h"

// NOTE: these 3 need to be global
FirebaseData fbdo;
FirebaseAuth firebaseAuth;
FirebaseConfig firebaseConfig;

FirebaseHelpers::FirebaseHelpers()
{
  Serial.print("Initializing Firebase... ");
};

void FirebaseHelpers::setupFirebase()
{
  Serial.print("Connecting Firebase... ");
  /* Assign the project host and api key (required) */
  firebaseConfig.host = SECRET_FIREBASE_HOST;
  firebaseConfig.api_key = SECRET_FIREBASE_API_KEY;

  /* Assign the user sign in credentials */
  firebaseAuth.user.email = SECRET_FIREBASE_USER_EMAIL;
  firebaseAuth.user.password = SECRET_FIREBASE_USER_PASSWORD;

  // Serial.println("Stage 1");
  Firebase.reconnectWiFi(true);
  // Serial.println("Stage 2");

  /* Initialize the library with the Firebase auth and config */
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  // Serial.println("Stage 3");

  //Set the size of HTTP response buffers in the case where we want to work with large data.
  fbdo.setResponseSize(1024);

  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.RTDB.setReadTimeout(&fbdo, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.RTDB.setwriteSizeLimit(&fbdo, "tiny");

  //optional, set the decimal places for float and double data to be stored in database
  Firebase.setFloatDigits(2);
  Firebase.setDoubleDigits(2);

  Serial.println("complete!");

  /* Get the token status */
  struct token_info_t info = Firebase.authTokenInfo();
  if (info.status == token_status_error)
  {
    Serial.printf("Token info: type = %s, status = %s\n", getTokenType(info).c_str(), getTokenStatus(info).c_str());
    Serial.printf("Token error: %s\n\n", getTokenError(info).c_str());
    //  abort();
  }
  else
  {
    // Serial.printf("Token info: type = %s, status = %s\n\n", getTokenType(info).c_str(), getTokenStatus(info).c_str());
  }
}

/* The helper function to get the token type string */
String FirebaseHelpers::getTokenType(struct token_info_t info)
{
  switch (info.type)
  {
  case token_type_undefined:
    return "undefined";

  case token_type_legacy_token:
    return "legacy token";

  case token_type_id_token:
    return "id token";

  case token_type_custom_token:
    return "custom token";

  case token_type_oauth2_access_token:
    return "OAuth2.0 access token";

  default:
    break;
  }
  return "undefined";
}

/* The helper function to get the token status string */
String FirebaseHelpers::getTokenStatus(struct token_info_t info)
{
  switch (info.status)
  {
  case token_status_uninitialized:
    return "uninitialized";

  case token_status_on_signing:
    return "on signing";

  case token_status_on_request:
    return "on request";

  case token_status_on_refresh:
    return "on refreshing";

  case token_status_ready:
    return "ready";

  case token_status_error:
    return "error";

  default:
    break;
  }
  return "uninitialized";
}

/* The helper function to get the token error string */
String FirebaseHelpers::getTokenError(struct token_info_t info)
{
  String s = "code: ";
  s += String(info.error.code);
  s += ", message: ";
  s += info.error.message.c_str();
  return s;
}

void FirebaseHelpers::saveLog(long epochTime, int co2, int voc)
{
  String timeKey = (String)epochTime;
  String rootpath = "/logs";
  String fullPath = rootpath + "/" + timeKey;

  FirebaseJson dataToSave;
  dataToSave.set("co2", co2);
  dataToSave.set("voc", voc);

  Firebase.RTDB.set(&fbdo, fullPath.c_str(), &dataToSave);
}
