import React from 'react';
import { Provider } from 'react-redux';
import RoutesWithNavigation from './routes/RoutesWithNavigation';
import { store } from './shared/redux-store/store';
import WebSocketConnection from './shared/websockets/WebSocketConnection';



const App = () => {

    return (

        <Provider store={store}>
            <WebSocketConnection>
                <RoutesWithNavigation />
                </WebSocketConnection>
        </Provider>
    );
};

export default App;