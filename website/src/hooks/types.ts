//
// BASIC
//

export type Data = number[];

//
// LOGS
//

export interface LogFirebase {
  [timestamp: number]: Record<string, number>;
}

//
// HISTORIC DATA
//

type HistoricSummary = {
  min: number;
  max: number;
  avg: number;
};
export interface HistoricFirebase {
  [timestamp: number]: Record<string, HistoricSummary>;
}

//
// FAN
//
export interface FanSettingsFirebase {
  [name: string]: Fan;
}
export interface Fan {
  speed: number;
}
