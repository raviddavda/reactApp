import { Grid, TextField } from "@mui/material";

const fieldTextArr = [
  { id: "title", label: "Title", value: "title", required: true },
  { id: "subtitle", label: "Subtitle", value: "subtitle", required: true },
  {
    id: "description",
    label: "Description",
    value: "description",
    required: true,
  },
  { id: "phone", label: "Phone Number", required: true },
  { id: "mail", label: "Mail", value: "mail", required: true },
  { id: "web", label: "Web", value: "web" },
  { id: "url", label: "Image URL", value: "url" },
  { id: "alt", label: "Image Desctiption", value: "alt" },
  { id: "state", label: "State", value: "state" },
  { id: "country", label: "Coutry", value: "country", required: true },
  { id: "city", label: "City", value: "city", required: true },
  { id: "street", label: "Street", value: "street", required: true },
  {
    id: "houseNumber",
    label: "House Number",
    value: "houseNumber",
    required: true,
  },
  { id: "zip", label: "Zip Code", value: "zip" },
];

const FieldTextComp = ({ inputsValue, onChange }) => {
  return fieldTextArr.map((fieldText) => (
    <Grid key={fieldText.id} item xs={12} sm={6}>
      <TextField
        id={fieldText.id}
        label={fieldText.label}
        required={fieldText.required}
        fullWidth
        variant="outlined"
        onChange={onChange}
        value={inputsValue[fieldText.value]}
      />
    </Grid>
  ));
};

export default FieldTextComp;
