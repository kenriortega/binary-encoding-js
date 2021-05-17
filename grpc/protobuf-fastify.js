'use strict'
const path = require('path')

const fastify = require('fastify')({
    logger: {
        prettyPrint: true
    }
})

fastify.register(require('./fastify-protobufjs-serializer'), {
    protoloadPath: path.join(__dirname, 'schema', 'package.proto'),
    messagePackage: 'Package'
})

fastify.post('/decode', (req, reply) => {
    // http POST http://localhost:5000/decode Accept:application/x-protobuf Content-Type:application/x-protobuf @grpc\package-protobuf.dat
    const body = req.body
    return body
})
fastify.get('/encode', (req, reply) => {
    // http http://localhost:5000/encode Accept:application/x-protobuf

    reply.send({
        name: "binari-encodings",
        private: true,
        version: "1.0.0",
        main: "index.js",
        licence: "MIT",
        value: 42
    })
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