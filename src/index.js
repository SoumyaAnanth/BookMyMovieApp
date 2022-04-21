import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';


ReactDOM.render(
    <Controller baseUrl="http://localhost:8085/api/v1/" />,
    document.getElementById('root'));
registerServiceWorker();
