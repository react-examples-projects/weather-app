import Routers from "./Routers";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGlobalStateContext } from "./Context/GlobalStateContext";

import "react-loading-skeleton/dist/skeleton.css";
import "./Styles/index.scss";
import "./Styles/utils.css";
import "inter-ui/inter.css";

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

export default function App() {
  const { theme } = useGlobalStateContext();

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </GeistProvider>
  );
}
