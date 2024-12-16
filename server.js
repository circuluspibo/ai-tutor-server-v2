
const f = require('fastify')({ logger: true })
const path = require('node:path')

f.register(require('@fastify/static'), {
  root: path.join(__dirname, 'web'),
  prefix: '/web', // optional: default '/'
  //constraints: { host: 'example.com' } // optional: default {}
})

// Declare a route
f.get('/test', function handler (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
f.listen({ ip : '0.0.0.0', port: 9999 }, (err) => {
  //console.log('Server started!')
  if (err) {
    f.log.error(err)
    process.exit(1)
  }
})
