export const getRandomHue = (option?: { min?: number; max?: number }) => {
  const { min = 0, max = 360 } = option ?? {};
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
