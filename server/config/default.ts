export default {
  port: 1337,
  uriDB: 'mongodb://localhost:27017/<dbname>',
  saltWorkFactor: 10,
  origin: 'http://localhost:3000',
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  publicKey: [
    '-----BEGIN PUBLIC KEY-----',
    '<PUBLIC KEY HERE>',
    '-----END PUBLIC KEY-----',
  ].join('\n'),
  privateKey: [
    '-----BEGIN RSA PRIVATE KEY-----',
    '<PRIVATE KEY HERE>',
    '-----END RSA PRIVATE KEY-----',
  ].join('\n'),
  googleClientID:
    '<GOOGLE CLIENT ID HERE>',
  googleClientSecret: '<GOOGLE SECRET ID HERE>',
  googleRedirectUrl: 'http://localhost:1337/api/sessions/oauth/google',
};
