export const useDateFormatter = () => {
  const formatter = new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });
  return formatter;
};
