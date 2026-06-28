/**
 * Application entry point.
 * Wraps the app with all necessary providers.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { WorkflowProvider } from './context/WorkflowContext';
import { UIProvider } from './context/UIContext';
import { GenerationProvider } from './context/GenerationContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <WorkflowProvider>
          <GenerationProvider>
            <App />
          </GenerationProvider>
        </WorkflowProvider>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>
);
