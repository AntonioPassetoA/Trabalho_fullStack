import { useContext } from 'react';
import { CatContext } from '../contexts/CatContext';
import { CircularProgress, Grid, Card, CardMedia, Typography } from '@mui/material';

export default function CatList() {
  const { state } = useContext(CatContext);
  const { cats, loading, error } = state;

  if (loading) return (
    <Grid container justifyContent="center" sx={{ mt: 5 }}>
      <CircularProgress />
    </Grid>
  );
  if (error) return (
    <Typography color="error" textAlign="center" sx={{ mt: 5 }}>
      {error}
    </Typography>
  );

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      {cats.map((cat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ height: 350 }}>
            <CardMedia
              component="img"
              height="100%"
              image={cat.url}
              alt="Imagem de gato"
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
