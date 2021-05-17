'use strict';
const fs = require('fs')
const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, 'schema', 'Service.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        arrays: true,
    }
)

const packageObject = grpc.loadPackageDefinition(packageDefinition)
const chat = new packageObject.Chat('localhost:5001', grpc.credentials.createInsecure())


chat.sendMessage({ name: 'Ort', content: ' Hola  cuba ' }, (err, result) => {
    if (err) throw err
    console.log(result)
    console.log("Enviado")
})

chat.getHistory(null, (err, result) => {
    if (err) throw err
    console.log(result)
})

const stream = chat.getHistoryStream(null)
stream.on('data', (data) => {
    console.log(data)
})
