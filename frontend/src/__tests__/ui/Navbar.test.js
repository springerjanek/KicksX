import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { wrapper } from "../../utils/test-utils";

import { Navbar } from "components/ui/Navbar/Navbar";

test("renders correct navbar while user is logged in", async () => {
  wrapper(<Navbar />, {
    preloadedState: {
      auth: {
        user: {
          isLoggedInPersisted: "true",
        },
      },
    },
  });
  const dash = screen.getByText("Dashboard");
  expect(dash).toBeInTheDocument();
  const signUp = screen.queryByText("Sign Up");
  expect(signUp).not.toBeInTheDocument();
});
