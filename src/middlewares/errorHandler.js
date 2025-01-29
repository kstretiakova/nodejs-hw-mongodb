export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;

    let errorMessage = err.message;
    if (err.name === 'ValidationError') {
      errorMessage = Object.values(err.errors)
        .map((e) => e.message)
        .join(', ');
    }

    res.status(status).json({
      status,
      message: 'Something went wrong',
      data: errorMessage,
    });
  };
