export const updateMovie = async (_: unknown, params) => {
  const res = await fetch("http://localhost:3002/movie/config/update");

  const req = await res.json();

  return req;
};
