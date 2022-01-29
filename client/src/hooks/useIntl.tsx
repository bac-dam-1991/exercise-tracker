export const createDateFormatter = (locale: string = 'en-AU') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });
};

export const useDateFormatter = () => {
  return createDateFormatter();
};
