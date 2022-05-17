interface IMovieInput {
  data: { name: string; author: string; slug: string; description: string };
}

export const createMovie = async (_: unknown, params: IMovieInput) => {
  const res = await fetch("http://localhost:3002/movie/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params.data),
  });

  const movieInfo = await res.json();

  return movieInfo;
};
