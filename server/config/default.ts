export default {
  port: 1337,
  uriDB: 'mongodb://localhost:27017/<dbname>',
  saltWorkFactor: 10,
  origin: 'http://localhost:3000',
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  publicKey: [
    '-----BEGIN PUBLIC KEY-----',
    '/*PUBLIC KEY*/',
    '-----END PUBLIC KEY-----',
  ].join('\n'),
  privateKey: [
    '-----BEGIN RSA PRIVATE KEY-----',
    '/*PRIVATE KEY*/',
    '-----END RSA PRIVATE KEY-----',
  ].join('\n'),
};
