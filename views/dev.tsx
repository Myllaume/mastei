import { render } from 'react-dom';
import { AppName } from './components/appname';

const root = document.getElementById('root');
render(
  <>
    Welcome on <AppName />
  </>,
  root
);
