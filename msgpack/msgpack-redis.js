'use strict'

const Redis = require('ioredis')

const msgpack = require('@msgpack/msgpack')
require('dotenv').config()

const redis = new Redis(process.env.REDIS_URL)
const subRedis = new Redis(process.env.REDIS_URL)
const start = async () => {
    const data = Buffer.from(msgpack.encode({ hello: 'MNTD' }))
    await redis.setBuffer('my-buffer', data)

    const buffer = await redis.getBuffer('my-buffer')

    console.log(msgpack.decode(buffer))

    await subRedis.subscribe('my-channel')

    subRedis.on('messageBuffer', (topicBuffer, messageBuffer) => {
        if (topicBuffer.toString('utf8') === 'my-channel') {
            console.log(msgpack.decode(messageBuffer))
        }
    })
}

setInterval(() => {
    const msgBuffer = Buffer.from(msgpack.encode({ hello: 'WORLD' }))
    redis.publish('my-channel', msgBuffer)
}, 3_000)


start().catch(err => console.log(err))