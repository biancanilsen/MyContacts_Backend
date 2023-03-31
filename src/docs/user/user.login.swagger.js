const login = {
    tags: ["User"],
    summary: "Login User",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    properties: {
                        email: {
                            type: "string",
                            description: "The email of your user"
                        },
                        password: {
                            type: "string",
                            description: "The password of the user"
                        },
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Login user",
            content: {
                "application/json": {
                    schema: {
                        properties: {
                            apiResponse: {
                                type: "object",
                                description: "The response API",
                                properties: {
                                    token: {
                                        type: "string",
                                        description: "The message error"
                                    },
                                },
                            },
                            errors: {
                                type: "array",
                                description: "The list errors",
                                items: {
                                    properties: {
                                        message: {
                                            type: "object",
                                            description: "The message error"
                                        },
                                    }
                                },
                            },
                        }
                    }
                }
            }
        }
    }
}

module.exports = login;