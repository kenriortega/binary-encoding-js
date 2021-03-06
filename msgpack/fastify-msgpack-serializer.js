'use strict'

const fp = require('fastify-plugin')
const msgpack = require('@msgpack/msgpack')

function msgpackSerializerPlugin(fastify, options, next) {
    fastify.register(require('fastify-accepts-serializer'), {
        serializers: [
            {
                regex: /^application\/msgpack$/,
                serializer: body => Buffer.from(msgpack.encode(body))
            }
        ],
        default: 'application/json'
    })

    fastify.addContentTypeParser('application/msgpack', {
        parseAs: 'buffer'
    }, async (req, body, done) => {
        try {
            const res = msgpack.decode(body)
            return res
        } catch (err) {
            done(err)
        }
    })

    next()
}


module.exports = fp(msgpackSerializerPlugin, {
    fastify: '>=3.x',
    name: 'fastify-msgpack-serializer'
})