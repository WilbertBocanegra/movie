export interface IMovie {
  id?: string;
  name: string;
  author: string;
  slug: string;
  description: string;
}

interface IResponse<T = {}> {
  statusCode: number;
  data?: T;
  message?: string;
  info: string;
}

export const findAll = async (): Promise<IResponse<IMovie[]>> => {
  const res = await fetch("http://localhost:3002/find/movies");

  const movies: IResponse<IMovie[]> = await res.json();
  console.log("movies", movies);
  return movies;
};
