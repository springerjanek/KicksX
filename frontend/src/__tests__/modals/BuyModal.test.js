import React from "react";
import { screen, render, fireEvent, act } from "@testing-library/react";
import { wrapper } from "../../utils/test-utils";

import "@testing-library/jest-dom";

import { BuyActionsModal } from "components/modals/buy/BuyActionsModal";

describe("BuyModal Component", () => {
  it("should display correct data in modal", () => {
    wrapper(
      <BuyActionsModal
        productName={"JORDAN 1 MOCHA GS"}
        productData={{ size: "6Y", highestBid: 0, lowestAsk: 0 }}
        isFromPlaceBid={false}
      />
    );
    const input = screen.getByDisplayValue("0");
    const smartText = screen.getByText("NO ASKS TO BUY FROM AVAILABLE");

    expect(input).toBeInTheDocument();
    expect(smartText).toBeInTheDocument();
  });

  it("should update text after inputing new value", () => {
    wrapper(
      <BuyActionsModal
        productName={"JORDAN 1 MOCHA GS"}
        productData={{ size: "6Y", highestBid: 0, lowestAsk: 0 }}
        isFromPlaceBid={false}
      />
    );
    const changeToPlaceBidButton = screen.getByText("Place Bid");

    act(() => {
      changeToPlaceBidButton.click();
    });

    const smartText = screen.getByText(
      "Please enter your bid (Minimum bid is 1$)"
    );
    expect(smartText).toBeInTheDocument();

    const input = screen.getByDisplayValue("0");
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");
    expect(smartText).toHaveTextContent(
      "You are about to be the highest bidder"
    );
  });
});
