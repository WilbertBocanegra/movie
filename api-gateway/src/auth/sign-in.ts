interface IParams {
  data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    gender: GenderEnum;
  };
}

enum GenderEnum {
  WOMEN,
  MEN,
}

export const signUp = async (_: unknown, params: IParams) => {
  const res = await fetch("http://localhost:3000/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params.data),
  });

  const userInfo = await res.json();
  console.log(userInfo);
  return userInfo;
};
