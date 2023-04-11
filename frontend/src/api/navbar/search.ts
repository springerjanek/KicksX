export const search = (data: Products, input: string) => {
  console.log("essa", input);
  const matches: Product[] = [];
  const rest: Product[] = [];

  data!.forEach((product) => {
    const formattedProductTitle = product.name.toLowerCase();
    formattedProductTitle.includes(input.toLowerCase())
      ? matches.push(product)
      : rest.push(product);
  });
  matches.push(...rest);

  return matches;
};
