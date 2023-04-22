import { render } from 'react-dom';
import { AppName } from './components/appname';
import './main.css';
import { Card } from './components/card';

const root = document.getElementById('root');
render(
  <>
    Welcome on <AppName />
    <Card nbFragments={3} timestamp={1} />
    <Card nbFragments={3} timestamp={1} />
  </>,
  root
);
