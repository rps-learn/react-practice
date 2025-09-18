import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TodoProvider } from "./components/TodoContext";
import { UIProvider } from "./components/UIContext";
import './index.css'
import ErrorBoundary from "./ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<p>Oops, error in TodoApp!</p>}>
      <TodoProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </TodoProvider>
    </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);