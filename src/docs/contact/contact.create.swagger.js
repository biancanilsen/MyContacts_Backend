const createContact = {
    tags: ["Contact"],
    summary: "Create a new contact",
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    properties: {
                        nome: {
                            type: "string",
                            description: "The nome of your contact"
                        },
                        telefone: {
                            type: "string",
                            description: "The password of the contact"
                        },
                        email: {
                            type: "string",
                            description: "The email of yout contact"
                        },
                    },
                },

            },
        },
    },
    responses: {
        200: {
            description: "Created contact",
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
        },
        401: {
            description: "Unauthorized"
        },
        403: {
            description: "Forbidden"
        }
    },
}




module.exports = createContact