export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    next(err);
  }
};
export const forbidden = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send({ message: err.message });
  } else {
    next(err);
  }
};
export const catchAllErros = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "error 500" });
};
