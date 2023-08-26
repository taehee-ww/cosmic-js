import { Type as t, TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import Fastify from 'fastify';
import registerBatches from './batch';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({
    logger: true
}).setValidatorCompiler(TypeBoxValidatorCompiler).withTypeProvider<TypeBoxTypeProvider>()

await fastify.register(swagger, {
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
})
await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    transformSpecificationClone: true
})

// Declare a route
fastify.get('/', {
    schema: {
        response: {
            200: t.Object({
                hello: t.String({ examples: ['world'] })
            }, {
                examples: [
                    { hello: 'world' }
                ]
            })
        }
    }
}, async () => {
    return { hello: 'world' }
})

fastify.get('/redoc', async (request, reply) => {
    reply.header('content-type', 'text/html')
    return Bun.file('./src/api/elysia/redoc.html').text()
})

fastify.register(registerBatches, { prefix: '/batches' })

const start = async () => {
    try {
        await fastify.ready()
        fastify.swagger()
        const address = await fastify.listen({ port: 3000 })

        console.log(`Listening on ${address}`);
        console.log({ message: "Server is listening for requests." });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()