import { CatProvider } from './contexts/CatContext';
import SearchForm from './components/SearchForm';
import CatList from './components/CatList';
import { Container } from '@mui/material';

function App() {
  return (
    <CatProvider>
      <Container sx={{ mt: 5 }}>
        <SearchForm />
        <CatList />
      </Container>
    </CatProvider>
  );
}

export default App;