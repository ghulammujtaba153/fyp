// app/provider.js (or in _app.js if using the pages directory)

'use client'; // Ensures this runs on the client-side

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function ReduxProvider({ children }) {
   return <Provider store={store}>{children}</Provider>;
}
