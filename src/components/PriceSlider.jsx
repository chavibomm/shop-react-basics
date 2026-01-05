import { Slider } from "@mui/material";

export const PriceSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="price-slider">
      <p>
        Price: ${value[0]} – ${value[1]}
      </p>

      <Slider
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        disableSwap
      />
    </div>
  );
};


