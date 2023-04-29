import React, { useState } from 'react';
import ToggleSwitch from '../../components/TripleToggleSwitch/TripleToggleSwitch';
import Page from '../Page/Page';

function App() {
  const [selectedValue, setSelectedValue] = useState('Tháng');
  
  const handleToggle = (value) => {
    setSelectedValue(value);
  }
  
  return (
    <Page>
      <h1>Hello World!</h1>
      <ToggleSwitch 
        values={['Tháng', 'Quý', 'Năm']} 
        selected={selectedValue} 
        onChange={handleToggle}
      />
      <p>You have selected: {selectedValue}</p>
    </Page>
  );
}

export default App;
