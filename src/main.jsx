import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/style/style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { store } from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </StrictMode>
);
