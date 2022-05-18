interface IMovieInput {
  data: { name: string; author: string; slug: string; description: string };
}

/** Create movie with @type {IMovieInput} */
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

interface IParams {
  data: {
    id: string;
  };
}
/**    Remove movie with id query */
export const removeMovie = async (_: unknown, params: IParams) => {
  try {
    const res = await fetch(
      `http://localhost:3002/movie/config/delete?id=${params.data.id}`,
      {
        method: "DELETE",
      }
    );
    const req = await res.json();
    return req;
  } catch (err) {
    return {
      statusCode: 500,
      message: err.message,
      info: "Internal Server Error",
    };
  }
};

export const updateMovie = async (_: unknown, params: any) => {
  console.log(params);
  const res = await fetch(
    `http://localhost:3002/movie/config/update?id=${params.data.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.data),
    }
  );

  const req = await res.json();

  return req;
};
