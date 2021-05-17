'use strict'

const Redis = require('ioredis')
const path = require('path')
const protobufjs = require('protobufjs')

require('dotenv').config()
const root = protobufjs.loadSync(path.join(__dirname, 'schema', 'package.proto'))
const Package = root.lookupType('Package')

const redis = new Redis(process.env.REDIS_URL)
const subRedis = new Redis(process.env.REDIS_URL)

const start = async () => {

    await subRedis.subscribe('my-channel2')

    subRedis.on('messageBuffer', (topicBuffer, messageBuffer) => {
        if (topicBuffer.toString('utf8') === 'my-channel2') {
            console.log(Package.decode(messageBuffer))
        }
    })
}

setInterval(() => {
    const body = {
        name: "binari-encodings",
        private: true,
        version: "1.0.0",
        main: "index.js",
        licence: "MIT",
        value: 42
    }
    const protoBuffer = Buffer.from(Package.encode(Package.create(body)).finish())
    redis.publish('my-channel2', protoBuffer)
}, 3_000)


start().catch(err => console.log(err))