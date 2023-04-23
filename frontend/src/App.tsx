import React from "react";
import { Routing } from "Routing";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routing />
      <ToastContainer limit={3} style={{ width: "400px" }} />
    </QueryClientProvider>
  );
};
