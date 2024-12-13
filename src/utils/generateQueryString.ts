const generateQueryString = <
  T extends Record<string, string | number | undefined>
>(
  params: T
): string => {
  // Remove undefined or null values
  const filteredParams = Object.entries(params).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value); // Convert all values to strings
      }
      return acc;
    },
    {}
  );

  // Use URLSearchParams to encode the query string
  return new URLSearchParams(filteredParams).toString();
};

export default generateQueryString;
