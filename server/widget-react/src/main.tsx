import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const renderWidget = (elementId: string, widgetId?: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    createRoot(element!).render(
      <StrictMode>
        <App widgetId={widgetId} />
      </StrictMode>,
    );
  }
};

// renderWidget('root', 'c56ec30b-bf92-47b6-b80c-b3eb6eefe62f');
//@ts-ignore
window.renderQueueWidget = renderWidget;
