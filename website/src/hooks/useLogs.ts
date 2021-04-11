import React from "react";
import type firebase from "firebase";
import dayjs from "dayjs";

import { database } from "./useFirebase";
import type { Log } from "./types";
import { useQuery } from "react-query";

const FIREBASE_LOG_KEY = "logs";
const QUERY_KEY = "logs";

export const useLogs = () => {
  return useQuery<Log, Error>(
    QUERY_KEY,
    () => {
      const logRef = database.ref(FIREBASE_LOG_KEY);

      return new Promise((resolve) => {
        logRef.once("value", (snapshot) => {
          const data = snapshot.val();
          // console.log("data", data);
          resolve(data);
        });
      });
    },
    {
      staleTime: 10000,
      cacheTime: 10000,
    }
  );
};
