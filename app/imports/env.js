const { SUPERUSER_NAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD } = process.env;

export const SUPERUSER = {
  NAME: SUPERUSER_NAME,
  EMAIL: SUPERUSER_EMAIL,
  PASSWORD: SUPERUSER_PASSWORD,
};

export default { SUPERUSER };
