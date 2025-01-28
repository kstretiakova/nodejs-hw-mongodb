const ctrlWrapper = (ctrl) => {
    return async (requestAnimationFrame, res, next) => {
        try {
            await ctrl(requestAnimationFrame, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default ctrlWrapper;
