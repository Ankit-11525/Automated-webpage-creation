const USERNAME=process.env.PUBLIC_NEXT_USERNAME;
const PASSWORD=process.env.PUBLIC_NEXT_PASSWORD;

const ADMIN_USER = {
  username:USERNAME,
  password: PASSWORD, 
};
export const validateAdmin = (username: string, password: string) => {
  return username === ADMIN_USER.username && password === ADMIN_USER.password;
};