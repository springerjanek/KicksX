export const modalHandler = ({
  size,
  highestBid,
  lowestAsk,
  bids,
  asks,
  setHighestBid,
  setLowestAsk,
  setProductDataToModal,
  setShowSizesModal,
}: {
  size?: string;
  highestBid?: number;
  lowestAsk?: number;
  bids?: {
    size: string;
    bids: number[];
  }[];
  asks?: {
    size: string;
    asks: number[];
  }[];
  setHighestBid: React.Dispatch<React.SetStateAction<number>>;
  setLowestAsk: React.Dispatch<React.SetStateAction<number>>;
  setProductDataToModal: React.Dispatch<
    React.SetStateAction<{
      size: string;
      highestBid: number;
      lowestAsk: number;
    }>
  >;
  setShowSizesModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setShowSizesModal(true);
  if (highestBid !== undefined) {
    setHighestBid(highestBid);

    const asksOfDesiredSize = asks!.find((x) => x.size === size)!;
    const asksAreEmpty = asksOfDesiredSize.asks.length === 0;
    if (!asksAreEmpty) {
      const lowestAsk = Math.min(...asksOfDesiredSize.asks);
      setProductDataToModal({
        size: size!,
        highestBid: highestBid,
        lowestAsk: lowestAsk,
      });
      setLowestAsk(lowestAsk);
    } else {
      setProductDataToModal({
        size: size!,
        highestBid: highestBid,
        lowestAsk: 0,
      });
      setLowestAsk(0);
    }
  }

  if (lowestAsk !== undefined) {
    setLowestAsk(lowestAsk);
    const bidsOfDesiredSize = bids!.find((x) => x.size === size)!;
    const bidsAreEmpty = bidsOfDesiredSize.bids.length === 0;
    if (!bidsAreEmpty) {
      const highestBid = Math.max(...bidsOfDesiredSize.bids);
      setProductDataToModal({
        size: size!,
        highestBid: highestBid,
        lowestAsk: lowestAsk,
      });
      setHighestBid(highestBid);
    } else {
      setProductDataToModal({
        size: size!,
        highestBid: 0,
        lowestAsk: lowestAsk,
      });
      setHighestBid(0);
    }
  }
};
