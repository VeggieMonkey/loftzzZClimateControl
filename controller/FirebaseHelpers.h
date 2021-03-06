#pragma once
#include <Firebase_ESP_Client.h>

class FirebaseHelpers
{
public:
  FirebaseHelpers();

  void setupFirebase();

  void saveLog(long epochTime, int co2, int voc, float tmp, float hum);
  int readInt(String path);
  void saveInt(String path, int value);

  /* The helper function to get the token status string */
  String getTokenStatus(struct token_info_t info);

  /* The helper function to get the token type string */
  String getTokenType(struct token_info_t info);

  /* The helper function to get the token error string */
  String getTokenError(struct token_info_t info);
};
