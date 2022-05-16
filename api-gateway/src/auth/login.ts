interface ILogin {
  data: { email: string; password: string };
}

export const login = async (_: any, params: ILogin, ctx: { data: string }) => {
  const res = await fetch(
    `http://localhost:3000/auth/login?email=${params.data.email}&password=${params.data.password}`
  );
  const user = await res.json();

  console.log(user);

  return user;
};
