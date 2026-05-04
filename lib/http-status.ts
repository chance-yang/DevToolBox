export interface StatusCode {
  code: number;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
}

export const HTTP_STATUS_CODES: StatusCode[] = [
  { code: 100, name: { en: "Continue", zh: "继续" }, description: { en: "The server has received the request headers and the client should proceed to send the request body.", zh: "服务器已收到请求头，客户端可以继续发送请求体。" } },
  { code: 101, name: { en: "Switching Protocols", zh: "切换协议" }, description: { en: "The requester has asked the server to switch protocols and the server has agreed to do so.", zh: "服务器同意切换到客户端请求的协议（如升级到 WebSocket）。" } },
  { code: 102, name: { en: "Processing", zh: "处理中" }, description: { en: "The server has received and is processing the request, but no response is available yet (WebDAV).", zh: "服务器已收到并正在处理请求，目前还没有响应（WebDAV）。" } },
  { code: 103, name: { en: "Early Hints", zh: "提前提示" }, description: { en: "Used to return some response headers before final HTTP message — useful for preload hints.", zh: "用于在最终响应前提前返回部分头部，常用于预加载提示。" } },

  { code: 200, name: { en: "OK", zh: "成功" }, description: { en: "Standard response for successful HTTP requests.", zh: "请求成功，最常见的成功状态。" } },
  { code: 201, name: { en: "Created", zh: "已创建" }, description: { en: "The request has been fulfilled and a new resource has been created.", zh: "请求成功并创建了新资源，常用于 POST。" } },
  { code: 202, name: { en: "Accepted", zh: "已接受" }, description: { en: "The request has been accepted for processing, but the processing has not been completed.", zh: "请求已被接受，但处理尚未完成。" } },
  { code: 204, name: { en: "No Content", zh: "无内容" }, description: { en: "The server successfully processed the request and is not returning any content.", zh: "请求成功但响应体为空。" } },
  { code: 205, name: { en: "Reset Content", zh: "重置内容" }, description: { en: "The server successfully processed the request, but the client should reset the document view.", zh: "请求成功，并要求客户端重置文档视图。" } },
  { code: 206, name: { en: "Partial Content", zh: "部分内容" }, description: { en: "The server is delivering only part of the resource due to a range header sent by the client.", zh: "服务器按 Range 头返回部分内容（断点续传等）。" } },

  { code: 301, name: { en: "Moved Permanently", zh: "永久重定向" }, description: { en: "This and all future requests should be directed to the given URI. Method may change to GET.", zh: "永久重定向。客户端历史上可能把 POST 转成 GET。" } },
  { code: 302, name: { en: "Found", zh: "临时重定向" }, description: { en: "Tells the client to look at another URL — historically the most commonly used redirect.", zh: "临时重定向。历史上最常用的重定向。" } },
  { code: 303, name: { en: "See Other", zh: "见其它" }, description: { en: "The response can be found under another URI using the GET method.", zh: "应使用 GET 在另一个 URI 上查询响应。" } },
  { code: 304, name: { en: "Not Modified", zh: "未修改" }, description: { en: "Indicates the resource has not been modified since last request — cached version is still valid.", zh: "资源自上次请求以来未变化，缓存仍然有效。" } },
  { code: 307, name: { en: "Temporary Redirect", zh: "临时重定向" }, description: { en: "The request should be repeated with another URI but future requests can still use the original.", zh: "本次请求应重定向到新 URI，但今后请求仍用原 URI。方法保持不变。" } },
  { code: 308, name: { en: "Permanent Redirect", zh: "永久重定向" }, description: { en: "The request and all future requests should be repeated using another URI with the same method.", zh: "永久重定向，要求保持原 HTTP 方法（与 301 区别）。" } },

  { code: 400, name: { en: "Bad Request", zh: "请求错误" }, description: { en: "The server cannot or will not process the request due to an apparent client error.", zh: "请求格式错误，服务器无法处理。" } },
  { code: 401, name: { en: "Unauthorized", zh: "未认证" }, description: { en: "Authentication is required and has failed or has not yet been provided.", zh: "需要认证但凭据缺失或错误。注意它表达的是 \"未认证\" 而不是 \"无权限\"。" } },
  { code: 403, name: { en: "Forbidden", zh: "禁止访问" }, description: { en: "The request was valid but the server is refusing action — the client is authenticated but not authorized.", zh: "请求合法但服务器拒绝处理 —— 已认证但无权限。" } },
  { code: 404, name: { en: "Not Found", zh: "未找到" }, description: { en: "The requested resource could not be found but may be available in the future.", zh: "找不到请求的资源。" } },
  { code: 405, name: { en: "Method Not Allowed", zh: "方法不允许" }, description: { en: "A request method is not supported for the requested resource.", zh: "请求方法不被该资源支持。" } },
  { code: 406, name: { en: "Not Acceptable", zh: "不可接受" }, description: { en: "The requested resource is incapable of generating content acceptable per the Accept headers.", zh: "无法返回 Accept 头要求的内容类型。" } },
  { code: 408, name: { en: "Request Timeout", zh: "请求超时" }, description: { en: "The server timed out waiting for the request.", zh: "等待客户端请求超时。" } },
  { code: 409, name: { en: "Conflict", zh: "冲突" }, description: { en: "The request could not be processed because of conflict in the current state of the resource.", zh: "由于资源当前状态与请求冲突而无法处理。" } },
  { code: 410, name: { en: "Gone", zh: "已永久删除" }, description: { en: "Indicates the resource is no longer available and will not be available again.", zh: "资源已永久删除且不会再回来。" } },
  { code: 411, name: { en: "Length Required", zh: "需要 Content-Length" }, description: { en: "The request did not specify the length of its content, which is required.", zh: "请求未携带必需的 Content-Length 头。" } },
  { code: 412, name: { en: "Precondition Failed", zh: "前置条件失败" }, description: { en: "The server does not meet one of the preconditions specified in the request headers.", zh: "请求头中的前置条件不满足。" } },
  { code: 413, name: { en: "Payload Too Large", zh: "负载过大" }, description: { en: "The request is larger than the server is willing or able to process.", zh: "请求体过大，超过服务器允许的上限。" } },
  { code: 414, name: { en: "URI Too Long", zh: "URI 过长" }, description: { en: "The URI provided was too long for the server to process.", zh: "请求 URI 过长。" } },
  { code: 415, name: { en: "Unsupported Media Type", zh: "不支持的媒体类型" }, description: { en: "The request entity has a media type which the server or resource does not support.", zh: "服务器不支持请求体的媒体类型。" } },
  { code: 418, name: { en: "I'm a teapot", zh: "我是茶壶" }, description: { en: "RFC 2324 April Fool's joke — a teapot cannot brew coffee. Not for real APIs.", zh: "RFC 2324 愚人节玩笑 —— 茶壶不能煮咖啡。不要在真实 API 中使用。" } },
  { code: 422, name: { en: "Unprocessable Entity", zh: "无法处理的实体" }, description: { en: "The request was well-formed but unable to be followed due to semantic errors. Common in JSON APIs for validation failure.", zh: "请求体语法正确但语义校验失败。常见于 JSON API 的字段校验。" } },
  { code: 423, name: { en: "Locked", zh: "已锁定" }, description: { en: "The resource that is being accessed is locked (WebDAV).", zh: "目标资源被锁定（WebDAV）。" } },
  { code: 425, name: { en: "Too Early", zh: "过早" }, description: { en: "Indicates that the server is unwilling to risk processing a request that might be replayed.", zh: "服务器不愿意处理可能被重放的请求。" } },
  { code: 426, name: { en: "Upgrade Required", zh: "需要升级" }, description: { en: "The client should switch to a different protocol such as TLS/1.3.", zh: "需要客户端升级到其它协议（例如 TLS/1.3）。" } },
  { code: 428, name: { en: "Precondition Required", zh: "需要前置条件" }, description: { en: "The origin server requires the request to be conditional.", zh: "服务器要求请求必须是条件请求。" } },
  { code: 429, name: { en: "Too Many Requests", zh: "请求过多" }, description: { en: "The user has sent too many requests in a given amount of time (rate limiting).", zh: "客户端在单位时间内请求过多（限流）。" } },
  { code: 431, name: { en: "Request Header Fields Too Large", zh: "请求头过大" }, description: { en: "The server is unwilling to process the request because either an individual header field, or all the headers collectively, are too large.", zh: "请求头单项或合计过大。" } },
  { code: 451, name: { en: "Unavailable For Legal Reasons", zh: "因法律原因不可用" }, description: { en: "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.", zh: "因法律原因（如版权请求、法院禁令）拒绝访问。" } },

  { code: 500, name: { en: "Internal Server Error", zh: "服务器内部错误" }, description: { en: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.", zh: "服务器内部错误，没有更具体的状态码可用。" } },
  { code: 501, name: { en: "Not Implemented", zh: "未实现" }, description: { en: "The server either does not recognize the request method, or it lacks the ability to fulfil the request.", zh: "服务器不支持该请求方法或无法实现该功能。" } },
  { code: 502, name: { en: "Bad Gateway", zh: "网关错误" }, description: { en: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", zh: "作为网关或代理时，从上游收到了非法响应。" } },
  { code: 503, name: { en: "Service Unavailable", zh: "服务不可用" }, description: { en: "The server is currently unavailable (because it is overloaded or down for maintenance). Use Retry-After.", zh: "服务暂时不可用（过载或维护）。常配合 Retry-After 头使用。" } },
  { code: 504, name: { en: "Gateway Timeout", zh: "网关超时" }, description: { en: "The server was acting as a gateway and did not receive a timely response from the upstream server.", zh: "作为网关或代理时未能及时从上游收到响应。" } },
  { code: 505, name: { en: "HTTP Version Not Supported", zh: "HTTP 版本不支持" }, description: { en: "The server does not support the HTTP protocol version used in the request.", zh: "服务器不支持请求所用的 HTTP 协议版本。" } },
  { code: 507, name: { en: "Insufficient Storage", zh: "存储不足" }, description: { en: "The server is unable to store the representation needed to complete the request (WebDAV).", zh: "服务器存储空间不足（WebDAV）。" } },
  { code: 508, name: { en: "Loop Detected", zh: "检测到循环" }, description: { en: "The server detected an infinite loop while processing the request (WebDAV).", zh: "处理请求时检测到无限循环（WebDAV）。" } },
  { code: 511, name: { en: "Network Authentication Required", zh: "需要网络认证" }, description: { en: "The client needs to authenticate to gain network access — used by captive portals.", zh: "需要先通过网络认证才能访问（常见于公共 Wi-Fi 强制登录页）。" } },
  { code: 521, name: { en: "Web Server Is Down (Cloudflare)", zh: "源服务器宕机（Cloudflare）" }, description: { en: "Cloudflare-specific code: the origin server has refused the connection.", zh: "Cloudflare 专属：源服务器拒绝了连接。" } },
  { code: 522, name: { en: "Connection Timed Out (Cloudflare)", zh: "连接超时（Cloudflare）" }, description: { en: "Cloudflare-specific code: a connection to the origin server timed out.", zh: "Cloudflare 专属：连接源服务器超时。" } },
  { code: 525, name: { en: "SSL Handshake Failed (Cloudflare)", zh: "SSL 握手失败（Cloudflare）" }, description: { en: "Cloudflare-specific code: the SSL handshake between Cloudflare and the origin failed.", zh: "Cloudflare 专属：与源服务器的 SSL 握手失败。" } },
];

export function categoryOf(code: number): "1xx" | "2xx" | "3xx" | "4xx" | "5xx" {
  if (code < 200) return "1xx";
  if (code < 300) return "2xx";
  if (code < 400) return "3xx";
  if (code < 500) return "4xx";
  return "5xx";
}
