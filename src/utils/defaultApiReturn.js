const defaultApiReturn = ({ apiResponse = {}, error = null}) => {
    return {
        apiResponse,
        errors: error ? [error] : [],
    }
}

module.exports = defaultApiReturn;