import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import "./Styles/index.css";
import "./Styles/utils.css";
import "inter-ui/inter.css";

import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </GeistProvider>
  </React.StrictMode>
);
