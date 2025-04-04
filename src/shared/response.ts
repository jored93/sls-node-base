export class HttpResponse {

  static defineResponse(statusCode = 502, data: any) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode,
      body: JSON.stringify(data),
    };
  }

  static _200(data: any) {
    return this.defineResponse(200, data);
  }

  static _201(data: any) {
    return this.defineResponse(201, data); // Created
  }

  static _204() {
    return this.defineResponse(204, {}); // No Content
  }

  static _400(data: any) {
    return this.defineResponse(400, data); // Bad Request
  }

  static _401(data: any) {
    return this.defineResponse(401, data); // Unauthorized
  }

  static _403(data: any) {
    return this.defineResponse(403, data); // Forbidden
  }

  static _404(data: any) {
    return this.defineResponse(404, data); // Not Found
  }

  static _500(data: any) {
    return this.defineResponse(500, data); // Internal Server Error
  }

  static _502(data: any) {
    return this.defineResponse(502, data); // Bad Gateway
  }

  static _503(data: any) {
    return this.defineResponse(503, data); // Service Unavailable
  }
}
