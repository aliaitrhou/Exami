export default function checkAuth(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).send({
      isLoggedIn: false,
    });
  }

  return res.status(200).send({
    isLoggedIn: true,
  });
}
