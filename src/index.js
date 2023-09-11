import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <App />
          <Notifications />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
