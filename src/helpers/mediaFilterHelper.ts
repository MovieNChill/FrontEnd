enum operator {
  ':',
  '<',
  '>',
}

export const mediaNameFilterHelper = (query: string) => {
  return `name${operator[0]}${query}`;
};

export const mediaGenreFilterHelper = (query: string) => {
  return `genre${operator[0]}${query}`;
};

export const mediaUpcomingFilterHelper = () => {
  const today = new Date().toISOString().slice(0, 10);
  return `releaseDate${operator[2]}${today}`;
};

export const mediaFilterHelper = (query: string) => {
  if (query.includes(':')) {
    const [filter, value] = query.split(':');
    return `${filter}${operator[0]}${value}`;
  }
  return query;
};
