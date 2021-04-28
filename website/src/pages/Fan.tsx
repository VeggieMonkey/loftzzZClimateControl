import React from "react";

import { Title, ToggleButton } from "../common";
import { mutateFan, useFan } from "../hooks/useFan";

export const Fan: React.FC = () => {
  const updateFanSettings = mutateFan("fan1");
  const { data, isLoading } = useFan();
  const [state] = React.useState(false);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <>Missing data</>;
  }

  const handleSelected = () => {
    const newSpeed = data.fan1 ? (data.fan1.speed === 100 ? 0 : 100) : 100;
    updateFanSettings.mutate({ fan1: { speed: newSpeed } });
  };

  return (
    <>
      <Title>Fan control settings</Title>
      <div>
        Enabled: <ToggleButton handleSelected={handleSelected} />
      </div>
      <div>Speed: {data.fan1 ? data.fan1.speed : "unknown"}</div>
    </>
  );
};
