const extractYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export { extractYear };
