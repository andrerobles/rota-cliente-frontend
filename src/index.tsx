import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import '@fortawesome/fontawesome-free/css/all.min.css';

const LightTheme = React.lazy(() => import('./components/LightTheme'));

const App = () => {
  return (
    <React.Fragment>
      <React.Suspense fallback={<></>}>
        <LightTheme />
      </React.Suspense>
      <BrowserRouter>
        {/*Conteúdo é entregue pela rota fornecida*/}
        <Router />
      </BrowserRouter>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);