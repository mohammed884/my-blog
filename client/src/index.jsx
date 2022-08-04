/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './index.css';
import "@fontsource/cairo";
import "@fontsource/roboto";
render(() => (
    <Router>
        <App />
    </Router>
), document.getElementById('root'));

