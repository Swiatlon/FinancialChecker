import React, { useContext } from 'react';
import ChoosingColorBox from './ChoosingColor.style';
import { ThemeUpdateContext } from '@/App';
import { alertForSuccessfulAction } from '@/helpers/Alerts/Swal';
import { SmallTitle } from '@/components/Reusable/Style/ReusableElements.style';

function ChoosingColor() {
  const basicColors = ['#046ee899', '#f59e0b', '#4338ca', '#D50000'];
  const defaultColor = localStorage.designColor ? localStorage.designColor : '#FFB60D';
  let choosedColor = defaultColor;

  // Context
  const setAppDesignColor = useContext(ThemeUpdateContext);
  return (
    <ChoosingColorBox>
      <SmallTitle>Application color:</SmallTitle>
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

      <SmallTitle>Color Picker</SmallTitle>

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
