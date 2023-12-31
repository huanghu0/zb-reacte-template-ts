import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store,persistor } from '@/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocationWatcher } from './hooks/LocationWatcher'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={ null } persistor={ persistor }>
      <BrowserRouter>
        <LocationWatcher>
          <React.Suspense>
            <App></App>
          </React.Suspense>
        </LocationWatcher>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
