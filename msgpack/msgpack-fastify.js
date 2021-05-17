'use strict'

const fastify = require('fastify')({
    logger: {
        prettyPrint: true
    }
})

fastify.register(require('./fastify-msgpack-serializer'))

fastify.post('/decode', (req, reply) => {
    // http POST http://localhost:5000/decode Accept:application/msgpack Content-Type:application/msgpack @msgpack\package-msgpack.dat

    const body = req.body
    return body
})
fastify.get('/encode', (req, reply) => {
    // http http://localhost:5000/encode Accept:application/msgpack

    reply.send({ hello: 'MNTD en vivo' })
})

const start = async () => {
    try {
        await fastify.listen(5000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()