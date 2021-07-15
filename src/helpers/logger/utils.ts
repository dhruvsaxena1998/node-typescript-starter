export const getResponseTime = (start: [number, number]): number => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
