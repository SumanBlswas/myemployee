const validator = (req, res, next) => {
  const method = req.method;
  const { email, password } = req.body;
  if (method === "POST") {
    if (typeof email === "string" && typeof password === "string") {
      next();
    } else {
      res.status(404).send({ msg: "Wrong Type" });
    }
  } else {
    next();
  }
};

export { validator };
