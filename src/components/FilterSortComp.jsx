import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";


// export const FilterSortComp = (props) => {
//   const { listOfOptions, label, onSelect } = props;

//   return (
//     <div className="collection-sort">
//       <label>{label}</label>
//       <select onChange={(event) => onSelect(event.target.value)}>
//         {listOfOptions.map((opt) => (
//           <option value={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

export const FilterSortComp = ({ listOfOptions, label, onSelect }) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>

        <Select
          label={label}
          onChange={(event) => onSelect(event.target.value)}
          defaultValue=""
        >
          {listOfOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
