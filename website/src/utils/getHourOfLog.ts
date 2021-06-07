import dayjs from "dayjs";

export const getHourOfLog = (timestamp: number) => {
  // 1618778395;

  return dayjs(timestamp).startOf("hour");
};
