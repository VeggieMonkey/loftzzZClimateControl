import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import ToggleButtonComponent from "@material-ui/lab/ToggleButton";

export const ToggleButton: React.FC<{
  handleSelected: (isOn: boolean) => void;
}> = ({ handleSelected }) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButtonComponent
      value="check"
      selected={selected}
      onChange={() => {
        const newState = !selected;
        setSelected(newState);
        handleSelected(newState);
      }}
    >
      <CheckIcon />
    </ToggleButtonComponent>
  );
};
