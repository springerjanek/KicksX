export const search = (data: Products, input: string) => {
  const matches: Product[] = [];

  data!.forEach((product) => {
    const formattedProductTitle = product.name.toLowerCase();
    formattedProductTitle.includes(input.toLowerCase()) &&
      matches.push(product);
  });

  return matches;
};
