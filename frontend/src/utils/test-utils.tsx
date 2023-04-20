import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistReducer } from "redux-persist";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import storage from "redux-persist/lib/storage";

import type { AppStore, RootState } from "../redux/store";
import authReducer from "../redux/authSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["isLoggedInTemporary", "error", "success"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const queryClient = new QueryClient();

export function wrapper(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: persistedReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function wrapAllElements({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      </QueryClientProvider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: wrapAllElements, ...renderOptions }),
  };
}

export const queryWrapper = ({ children }: PropsWithChildren<{}>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
