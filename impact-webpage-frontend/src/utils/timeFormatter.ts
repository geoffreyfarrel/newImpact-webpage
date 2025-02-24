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

const formatISOTimeWithDate = (isoTimeString: string | Date) => {
  // Format to show both date and time (e.g., "YYYY-MM-DD hh:mm")
  const date = new Date(isoTimeString);
  return date.toISOString().slice(0, 16).replace("T", " ");
};

export { convertToTaiwanTime, convertToUTCTime, formatISOTimeWithDate };
