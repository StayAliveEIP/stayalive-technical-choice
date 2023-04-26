const fastify = require('fastify')({
    logger: true
})
const fastifySwagger = require('@fastify/swagger')

fastify.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
        host: 'localhost:8081',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
})

//register swagger-ui
fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
})

fastify.register(async function (fastify, opts) {

    fastify.get('/', async (request, reply) => {
        return 'Hello, world!'
    })

    fastify.get('/hello/:name',
        {
            schema: {
                querystring: {
                    name: {type: 'string'}
                },
                response: {
                    200: {
                        type: 'string',
                        example: 'Hello, John!'
                    }
                }
            }
        }
        , async (request, reply) => {
            const {name} = request.params
            return `Hello, ${name}!`
        })

    fastify.get('/hello', async (request, reply) => {
        const {name} = request.query
        if (!name) return reply.code(400).send({error: 'Missing name query parameter'})
        return `Hello, ${name}!`
    })

    fastify.post('/hello', {
        schema: {
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {type: 'string'}
                }
            },
            response: {
                200: {
                    type: 'string',
                    example: 'Hello, Jane!'
                }
            }
        }
    }, async (request, reply) => {
        const {name} = request.body
        return `Hello, ${name}!`
    }).addHook('preHandler', async (request, reply) => {
        console.log('A POST request to /hello was received.')
    })
    const checkChickenCooked = (request, reply, done) => {
        const {chickenCooked} = request.body

        if (!chickenCooked) {
            reply.status(400).send({error: 'Chicken is not cooked!'})
        }

        done()
    }







    fastify.post('/check-chicken', {
        schema: {
            body: {
                type: 'object',
                required: ['chickenCooked'],
                properties: {
                    chickenCooked: {type: 'boolean'}
                }
            },
            response: {
                200: {
                    type: 'string',
                    example: 'The chicken is cooked!'
                },
                400: {
                    type: 'object',
                    properties: {
                        error: {type: 'string'}
                    },
                    example: {
                        error: 'Chicken is not cooked!'
                    }
                }
            }
        }
    }, checkChickenCooked, async (request, reply) => {
        return 'The chicken is cooked!'
    })

})

fastify.listen(8081, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('Server is now listening on port 8081')
})
