enum operator {
  ':',
  '<',
  '>',
}

export const mediaNameFilterHelper = (query: string) => {
  return `name${operator[0]}${query}`;
};

export const mediaUpcomingFilterHelper = () => {
  const today = new Date().toISOString().slice(0, 10);
  return `releaseDate${operator[2]}${today}`;
};
