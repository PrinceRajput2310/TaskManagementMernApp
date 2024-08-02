export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

// export const sendToken = (user, statusCode, res) => {
//   const token = user.getJWTToken();

//   // options for cookie
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     secure: false, // Use secure cookies in production
//     sameSite: "None", // SameSite attribute
//   };

//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     user,
//     token,
//   });
// };
