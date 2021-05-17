'use strict'

const fs = require('fs')
const net = require('net')
const path = require('path')
const avro = require('avsc')


const protocolFile = fs.readFileSync(path.join(__dirname, 'Service.avsc'), 'utf8')
const protocol = avro.readProtocol(protocolFile)

const service = avro.Service.forProtocol(protocol)



const client = service.createClient({
    buffering: true,
    transport: net.connect(5000)
})


client.sendMessage({ name: 'kalix', content: 'hola MNTD vivo' }, (err, result) => {
    if (err) throw err
    console.log(result)
})

client.getHistory((err, result) => {
    if (err) throw err
    console.log(result)
})