import React from "react";
import Routes from "Routing";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ToastContainer limit={3} style={{ width: "400px" }} />
    </QueryClientProvider>
  );
}

export default App;
