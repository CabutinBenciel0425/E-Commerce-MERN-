export const sanitizeUser = (user) => {
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};
