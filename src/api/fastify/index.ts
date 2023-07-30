import Fastify from 'fastify';
import registerBatches from './batch';

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async () => {
    return { hello: 'world' }
})

fastify.register(registerBatches, { prefix: '/batch' })

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()