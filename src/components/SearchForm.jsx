import { useState, useContext } from 'react';
import { CatContext } from '../contexts/CatContext';
import { TextField, Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const catBreeds = [
  { id: 'abys', name: 'Abyssinian' },
  { id: 'beng', name: 'Bengal' },
  { id: 'pers', name: 'Persian' },
  { id: 'siam', name: 'Siamese' },
  { id: 'sphy', name: 'Sphynx' }
];

export default function SearchForm() {
  const { dispatch } = useContext(CatContext);
  const [breed, setBreed] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!breed.trim()) {
      setError('Digite uma raça para buscar.');
      return;
    }

    setError('');
    dispatch({ type: 'FETCH_START' });

    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${breed}`);
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao buscar dados.' });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
    >
      <Paper elevation={3} sx={{ p: 5, width: '100%', maxWidth: '600px' }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
          Busque uma raça de gato
        </Typography>

        <List dense>
          {catBreeds.map((breedItem) => (
            <ListItem key={breedItem.id} sx={{ p: 0.5 }}>
              <ListItemText
                primary={`${breedItem.name} (Digite: "${breedItem.id}")`}
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </ListItem>
          ))}
        </List>

        <TextField
          label="ID da Raça (ex: abys)"
          variant="outlined"
          fullWidth
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mt: 2, mb: 3 }}
        />
        <Button variant="contained" fullWidth onClick={handleSearch} size="large">
          Buscar
        </Button>
      </Paper>
    </Box>
  );
}
