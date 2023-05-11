import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { wrapper } from "../../utils/test-utils";

import { Dashboard } from "components/dashboard/profile/Dashboard";

describe("Dashboard Component", () => {
  it("Display logout button", async () => {
    wrapper(<Dashboard />, {
      preloadedState: {
        auth: {
          user: {
            isLoggedInPersisted: "true",
          },
        },
      },
    });

    const logoutButton = screen.getByText("Logout");

    await waitFor(() => {
      expect(logoutButton).toBeInTheDocument();
    });
  });

  it("Logout user after clicking on logout button", async () => {
    wrapper(<Dashboard />, {
      preloadedState: {
        auth: {
          user: {
            isLoggedInPersisted: "true",
          },
        },
      },
    });

    const logoutButton = screen.getByText("Logout");

    logoutButton.click();
  });
});
