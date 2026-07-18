/**
 * @param delay number = 5000 (5s)
 */
export const sleep = (delay = 5000) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
