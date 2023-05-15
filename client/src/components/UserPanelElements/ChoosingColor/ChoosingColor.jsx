import React, { useContext } from 'react';
import ChoosingColorBox from './ChoosingColor.style';
import { ThemeUpdateContext } from '@/App';
import { alertForSuccessfulAction } from '@/helpers/Alerts/Swal';

function ChoosingColor() {
  const basicColors = ['#046ee899', '#f59e0b', '#4338ca', '#D50000'];
  const defaultColor = localStorage.designColor ? localStorage.designColor : '#FFB60D';
  let choosedColor = defaultColor;

  // Context
  const setAppDesignColor = useContext(ThemeUpdateContext);
  return (
    <ChoosingColorBox>
      <h3>Application color:</h3>
      {basicColors.map((color) => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          type="button"
          onClick={() => {
            choosedColor = color;
            setAppDesignColor(choosedColor).then(alertForSuccessfulAction('Color Changed'));
          }}
        >
          &nbsp;
        </button>
      ))}

      <h3>Color Picker</h3>

      <input
        type="color"
        value={choosedColor}
        onChange={(event) => {
          choosedColor = event.target.value;
        }}
        onBlur={() => {
          setAppDesignColor(choosedColor).then(alertForSuccessfulAction('Color Changed'));
        }}
      />
    </ChoosingColorBox>
  );
}

export default ChoosingColor;
