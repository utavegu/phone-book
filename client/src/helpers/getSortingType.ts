export const getSortingType = (sortBy: any): { [key: string]: 'asc' | 'desc' } => {
  if (sortBy.length) {
    const sortKey = sortBy[0].key;
    const sortOrder = sortBy[0].order;
    return { [sortKey]: sortOrder };
  }
  return { surname: 'asc' };
};
