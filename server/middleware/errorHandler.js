const errorHandler = (err, req, res, next) => {
  res
    ?.status(err?.statusCode || 500)
    .json({ error: err?.message || "Internal Server Error" });
};

export { errorHandler };
