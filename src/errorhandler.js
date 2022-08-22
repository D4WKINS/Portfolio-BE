export const NotFound = async (req, res, next) => {
    res.status(404).send({ error: `sorry we couldnt find that` })
}

export const ServerError = async (req, res, next) => {
    res.status(500).send({ error: `Server has failed` })
}
