import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import AskModal from "../components/modals/AskModal";
import Navbar from "../components/ui/Navbar";

const queryClient = new QueryClient();

test("renders component", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );

  const navElements = screen.getAllByRole("navigation");
  expect(navElements[0]).toHaveTextContent("KicksXx");
});
