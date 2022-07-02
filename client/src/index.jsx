/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import './index.css';
import App from './App';
import "@fontsource/cairo";
render(() => (
    <Router>
        <App />
    </Router>
), document.getElementById('root'));

