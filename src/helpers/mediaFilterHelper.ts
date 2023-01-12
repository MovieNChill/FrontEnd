enum operator {
  ':',
  '<',
  '>',
}

export const mediaFilterHelper = (query: string) => {
  return `name${operator[0]}${query}`;
};
