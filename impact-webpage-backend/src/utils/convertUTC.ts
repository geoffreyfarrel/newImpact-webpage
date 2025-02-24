const convertToTaiwanTime = (date: string | Date): Date => {
  const taiwanOffset = 8 * 60; // UTC+8 in minutes
  const localDate = new Date(date);
  return new Date(localDate.getTime() + taiwanOffset * 60 * 1000);
};

const convertToUTCTime = (date: string | Date): Date => {
  const taiwanOffset = 8 * 60; // UTC+8 in minutes
  const localDate = new Date(date);
  return new Date(localDate.getTime() - taiwanOffset * 60 * 1000);
};

export { convertToTaiwanTime, convertToUTCTime };
