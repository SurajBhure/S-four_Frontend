export const discount = (price, discount) => {
  //for discount price we need this formula
  const percentage = discount / 100;
  return price - price * percentage;
};
