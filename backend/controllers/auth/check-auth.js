export default function checkAuth(req, res) {
  // const token = req.cookies.token;
  //
  // if (!token) return res.status(200).json({ isLoggedIn: false });
  //
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   res.status(200).json({
  //     isLoggedIn: true,
  //     user: { id: decoded.userId, email: decoded.email, type: decoded.role },
  //   });
  // } catch (err) {
  //   res.status(200).json({ isLoggedIn: false });
  // }
  const token = req.cookies.token;
  console.log("token is :", token);

  if (!token) {
    return res.status(200).send({
      isLoggedIn: false,
    });
  }

  return res.status(200).send({
    isLoggedIn: true,
  });
}
