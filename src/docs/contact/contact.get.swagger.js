const getContacts = {
    tags: ["Contact"],
    security: [
        {
            bearerAuth: []
        }
    ],
    summary: "List all the contacts by User Token",
    response: {
        200: {
            content: {
                "application/json": {
                    schema: {
                        properties: {
                            apiResponse: {
                                type: "array",
                                description: "The response API",
                                items: {
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
                                            description: "The email of the contact"
                                        },
                                        data_alteracao: {
                                            type: "string",
                                            description: "The date alter of the contact"
                                        },
                                    }
                                }
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
            },
            401: {
                description: "Unauthorized"
            },
            403: {
                description: "Forbidden"
            }
        }
    }

}

module.exports = getContacts