import { database } from "./useFirebase";
import type { HistoricFirebase } from "./types";
import { useQuery } from "react-query";

const FIREBASE_KEY = "history";
const QUERY_KEY = "history";

export const useFan = ({ name }: { name?: string } = {}) => {
  return useQuery<HistoricFirebase, Error>(
    QUERY_KEY,
    () => {
      const ref = database.ref(FIREBASE_KEY);

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
