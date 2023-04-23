import { render } from 'react-dom';
import './main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Libraries } from './screens/libraries';

const queryClient = new QueryClient();

const root = document.getElementById('root');
render(
  <QueryClientProvider client={queryClient}>
    <Libraries />
  </QueryClientProvider>,
  root
);
