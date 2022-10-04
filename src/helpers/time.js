export const greetingByTime = () => {
  const now = new Date(),
    hour = now.getHours();
  let shift = 'Good ';
  shift += hour >= 4 && hour <= 11 ? 'Morning' : '';
  shift += hour >= 12 && hour <= 16 ? 'Afternoon' : '';
  shift += hour >= 17 && hour <= 20 ? 'Evening' : '';
  shift += hour >= 21 || hour <= 3 ? 'Night' : '';
  return shift;
};
