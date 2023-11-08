const validateBody = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: error.message })
    }
};

module.exports = validateBody;