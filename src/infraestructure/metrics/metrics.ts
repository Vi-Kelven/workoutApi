import promClient from 'prom-client'

const endpointResponseTimeHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code']
})

const httpErrorCounter = new promClient.Counter({
  name: 'http_request_errors_total',
  help: 'Total number of HTTP request errors',
  labelNames: ['method', 'route', 'code']
})

const requestSizeHistogram = new promClient.Histogram({
  name: 'http_request_size_products',
  help: 'Histogram of the number of products in HTTP requests',
  labelNames: ['method', 'route']
})

class Metrics {
  async registerResponseTimeHistogram (req, statusCode, startEpoch) {
    const duration = (Date.now() - startEpoch) / 1000
    endpointResponseTimeHistogram
      .labels(req.method.toLowerCase(), req.route ? req.route.path : req.path, statusCode.toString())
      .observe(duration)
  }

  async registerHttpErrorCounter (req, statusCode) {
    if (statusCode >= 400) {
      httpErrorCounter
        .labels(req.method.toLowerCase(), req.route ? req.route.path : req.path, statusCode.toString())
        .inc()
    }
  }

  async requestSizeMiddleware (req) {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const productCount = Array.isArray(req.body) ? req.body.length : 0
      requestSizeHistogram
        .labels(req.method.toLowerCase(), req.route ? req.route.path : req.path)
        .observe(productCount)
    }
  };

  async allCustomMetrics (req, statusCode, startEpoch) {
    await this.registerResponseTimeHistogram(req, statusCode, startEpoch)
    await this.registerHttpErrorCounter(req, statusCode)
    await this.requestSizeMiddleware(req)
  }
}

export = Metrics
