import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { wrapper } from "../../utils/test-utils";
import { setupServer } from "msw/node";
import { rest } from "msw";

import { Dashboard } from "components/dashboard/profile/Dashboard";

const server = setupServer(
  rest.get("http://localhost:3001/getUserData/undefined", (req, res, ctx) => {
    return res(
      ctx.json({
        purchases: [
          {
            id: "",
            date: "",
            name: "",
            price: null,
            size: "",
            thumbnail: "",
          },
        ],
        asks: [{ id: "", name: "", price: null, size: "", thumbnail: "" }],
        bids: [{ id: "", name: "", price: null, size: "", thumbnail: "" }],
        sales: [
          {
            id: "",
            date: "",
            name: "",
            price: null,
            size: "",
            thumbnail: "",
          },
        ],
        payout: { type: "PAYPAL" },
        payment: { type: "CC" },
        shipping: {
          zip: "01-234",
          country: "Poland",
          city: "Warsaw",
          phone: "123456789",
          surname: "Test",
          street: "Testowa 1",
          name: "Test",
          street_number: "15",
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Dashboard Component", () => {
  it("should display logout button", async () => {
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

  it("should display correct user informations", async () => {
    wrapper(<Dashboard />, {
      preloadedState: {
        auth: {
          user: {
            isLoggedInPersisted: "true",
          },
        },
      },
    });
    const xd = screen.getByText("Hello Test 😎");
    expect(xd).toBeInTheDocument();
  });
});
