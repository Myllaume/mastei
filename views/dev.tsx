import { render } from 'react-dom';
import { AppName } from './components/appname';
import './main.css';
import { Card } from './components/card';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = document.getElementById('root');
render(
  <QueryClientProvider client={queryClient}>
    <>
      Welcome on <AppName />
      <Card nbFragments={3} timestamp={1} />
      <Card nbFragments={3} timestamp={1} />
    </>
  </QueryClientProvider>,
  root
);
