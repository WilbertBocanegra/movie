export const findAllUser = async (): Promise<any> => {
  const res = await fetch("http://localhost:3001/find/users");

  const users = await res.json();
  console.log(users);
  return users;
};
