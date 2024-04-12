import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Truckbusters appointment API',
      description: "API for the appointments of the website Truckbusters",
      contact: {
        name: "Aurore Reynier",
        url: "https://github.com/aReynier"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3002/",
        description: "Local server"
      },
      {
        url: "https://truckbusters-backend.onrender.com/",
        description: "Live server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs