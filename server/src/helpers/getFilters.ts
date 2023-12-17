export const getFilters = (name: string, values: string) => {
  if (name && values) {
    const convertedValues = values.split(',');
    const filterConditions = convertedValues.map((value) => {
      return { [name]: value };
    });
    return { $or: filterConditions };
  }
  return {};
};
