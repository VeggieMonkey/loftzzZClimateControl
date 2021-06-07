import dayjs from "dayjs";

export const displayDate = (value: string | number) =>
  dayjs(Number(value)).format("DD/MM/YYYY H:m:s");
