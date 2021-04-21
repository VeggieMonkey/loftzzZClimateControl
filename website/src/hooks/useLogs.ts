import { database } from "./useFirebase";
import type { LogFirebase } from "./types";
import { useQuery } from "react-query";

const FIREBASE_KEY = "logs";
const QUERY_KEY = "logs";

export const useFirstLog = () => {
  return useLogs({ first: 1, key: "first" });
};

export const useLogs = ({
  limit,
  first,
  key,
}: { first?: number; limit?: number; key?: string } = {}) => {
  return useQuery<LogFirebase, Error>(
    [QUERY_KEY, key],
    () => {
      let ref = database.ref(FIREBASE_KEY).orderByKey();

      if (limit) {
        // console.log("Adding limit:", limit);
        ref = ref.limitToLast(limit);
      }

      if (first) {
        // console.log("Adding first:", first);
        ref = ref.limitToFirst(first);
      }

      return new Promise((resolve) => {
        ref.once("value", (snapshot) => {
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

export const useLogsForRange = (start: number, end: number) => {
  return useQuery<LogFirebase, Error>(
    QUERY_KEY,
    () => {
      const ref = database
        .ref(FIREBASE_KEY)
        .orderByKey()
        .startAt(String(start))
        .endAt(String(end));

      return new Promise((resolve) => {
        ref.once("value", (snapshot) => {
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

// delete logs in range of: x -> y
