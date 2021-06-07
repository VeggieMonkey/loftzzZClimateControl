import React from "react";
import { Text } from "../common";
// import { smokeAllLogs } from "../hooks/useLogs";

export const Settings: React.FC = () => {
  const handleDelete = () => {
    console.log("Disabled");
    // smokeAllLogs();
  };
  return (
    <div>
      <div>
        <div onClick={handleDelete}>DELETE ALL LOGS</div>
      </div>
      <div>
        <Text>There are no other settings yet.</Text>
      </div>
    </div>
  );
};
