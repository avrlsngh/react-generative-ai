import { Autocomplete, Chip, TextField } from "@mui/material";
import { preFilledTags } from "../../utils/helper";

function AddTopicFields({ topicNameRef, keywordsRef }) {
  return (
    <>
      <TextField
        label="Topic Name"
        variant="outlined"
        onChange={(event) => {
          topicNameRef.current = event.target.value;
        }}
        sx={{
          width: "100%",
          marginTop: 4,
        }}
      />
      <Autocomplete
        onChange={(event, value) => {
          keywordsRef.current = value;
        }}
        sx={{
          marginTop: 4,
        }}
        multiple
        id="tags-filled"
        options={preFilledTags}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Keywords"
            placeholder="Type a Keyword"
          />
        )}
      />
    </>
  );
}

export default AddTopicFields;
