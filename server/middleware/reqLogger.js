const reqLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const color = duration > 1000 ? '\x1b[31m' : duration > 500 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)\x1b[0m`);
  });
  next();
};

module.exports = reqLogger;
