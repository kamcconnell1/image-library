export const formatDate = (d: string) => {
  const date = new Date(d);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
