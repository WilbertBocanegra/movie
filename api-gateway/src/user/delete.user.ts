interface IParams {
  data: {
    id: string;
  };
}

export const userRemove = async (_: unknown, params: IParams) => {
  const res = await fetch(
    `http://localhost:3001/user/config/delete?id=${params.data.id}`
  );

  const req = await res.json();

  return req;
};
