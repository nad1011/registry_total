import React, { useState, useEffect } from "react";
import {
  Switch,
  SwitchLabel,
  SwitchRadio,
  SwitchSelection,
} from "./Styles.jsx";

function ToggleSwitch ({ values, selected, onChange, changeGraph }) {
  const [selectedState, setSelectedState] = useState(selected);
  const titleCase = (str) =>
    str
      .split(/\s+/)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  const ClickableLabel = ({ title, onChange, id }) => (
    <SwitchLabel onClick={() => onChange(title)} className={id}>
      {titleCase(title)}  
    </SwitchLabel>
  );

  const ConcealedRadio = ({ value, selected }) => (
    <SwitchRadio type="radio" name="switch" checked={selected === value} readOnly={true}/>
  );
  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);

  const handleChange = (val) => {
    setSelectedState(val);
    if (onChange) onChange(val);
    changeGraph();
  };

  const selectionStyle = () => {
    return {
      left: `${(values.indexOf(selectedState) / 3) * 100}%`,
    };
  };

  return (
    <Switch>
      {values.map((val) => {
        return (
          <span key={val}>
            <ConcealedRadio value={val} selected={selectedState} />
            <ClickableLabel title={val} onChange={handleChange} />
          </span>
        );
      })}
      <SwitchSelection style={selectionStyle()} />
    </Switch>
  );
};

export default ToggleSwitch;