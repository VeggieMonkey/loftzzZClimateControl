import React from "react";

import { Title, ToggleButton } from "../common";

export const Fan: React.FC = () => {
  const [state, handleSelected] = React.useState(false);

  console.log("state", state);

  return (
    <>
      <Title>Fan control settings</Title>
      Enabled: <ToggleButton handleSelected={handleSelected} />
    </>
  );
};
