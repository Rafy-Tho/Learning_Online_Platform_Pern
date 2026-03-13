const createRandomCode = () => {
  const randomCode = Math.floor(100000 + Math.random() * 900000);
  return randomCode.toString();
};
export default createRandomCode;
