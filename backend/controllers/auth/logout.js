const logout = (req, res) => {
  console.log("logout endpoint");
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, //NOTE: set true if using HTTPS in production
    sameSite: "lax",
  });
  res.status(200).send({ message: "Logged out successfully" });
};

export default logout;
