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

  static _500(data: any) {
    return this.defineResponse(500, data);
  }
}