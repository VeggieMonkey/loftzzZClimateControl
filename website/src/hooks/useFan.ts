import { database } from "./useFirebase";
import type { FanSettingsFirebase } from "./types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const FIREBASE_KEY = "fan";
const QUERY_KEY = "fan";

export const useFan = ({ name }: { name?: string } = {}) => {
  return useQuery<FanSettingsFirebase, Error>(
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

export const mutateFan = (
  fan: string,
  onSuccess?: (data: FanSettingsFirebase) => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: FanSettingsFirebase) => {
      const ref = database.ref(FIREBASE_KEY);

      return ref.update(data);
    },
    {
      onSuccess: (data, next) => {
        if (onSuccess) {
          return onSuccess(next);
        }

        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );

  return mutation;
};
