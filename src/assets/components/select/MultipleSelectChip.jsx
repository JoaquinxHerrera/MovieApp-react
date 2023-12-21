import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

MultipleSelectChip.propTypes = {
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    handleSearch: PropTypes.func.isRequired,
    selectedGenres: PropTypes.array.isRequired,
    handleChangeGenres: PropTypes.func.isRequired,
    setGenres: PropTypes.func.isRequired,
  };

export default function MultipleSelectChip({genres, setGenres, handleChangeGenres, selectedGenres}) {
  const theme = useTheme();

  
  
//   const handleChange = (event, selectedValues) => {
//     const selectedGenresNames = Array.isArray(selectedValues)
//     ? selectedValues.map((value) => value.name)
//     : [];
//     handleChangeGenres(event, selectedGenresNames);
//   };
    const handleChange = (event, value) => {
    // Actualiza el estado con un array de objetos
    setGenres(value);
  
    // Llama a la función de cambio externa
    handleChangeGenres(event, value);
  };


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">Genres</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={selectedGenres.map((genre) => genre.name)}
          onChange={handleChange}
          input={<OutlinedInput id="multiple-chip-label" label="Genres" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre.id}
              value={genre}
              style={getStyles(genre.name, selectedGenres, theme)}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}