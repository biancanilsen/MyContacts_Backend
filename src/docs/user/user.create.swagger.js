const createUser = {
    tags: ["User"],
    summary: "Create a User",
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
            description: "User created",
            content: {
                "application/json": {
                    schema: {
                        properties: {
                            apiResponse: {
                                type: "object",
                                description: "The response API"
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


module.exports = createUser;