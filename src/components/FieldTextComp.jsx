import { Grid, TextField } from "@mui/material";

const FieldTextComp = ({
  id,
  label,
  required,
  isError,
  helperText,
  value,
  onChange,
  type,
}) => {
  return (
    <Grid key={id} item xs={12} sm={6}>
      <TextField
        error={isError}
        helperText={helperText}
        id={id}
        label={label}
        required={required}
        type={type}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
};

export default FieldTextComp;
