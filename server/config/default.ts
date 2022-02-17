export default {
  port: 1337,
  uriDB: 'mongodb://localhost:27017/<dbname>',
  saltWorkFactor: 10,
  origin: 'http://localhost:3000',
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  publicKey: [
    '-----BEGIN PUBLIC KEY-----',
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdR9S2qLHW490SlV4nTi1Km+VKX3CbJ3fU7GBIKWljLbJtmjxvT9gVgbhfZwx6Fk+Nj8zqB4ZmcMkr3luL4e1b3bjzobD1a8HwJI43g6KO5tfM2EnO/dUp2bfcxGnFr6tTx6g0fWpDHsmSc+Y3tdJsiVGBqRUJ1H+FeJSI4wPwQQIDAQAB',
    '-----END PUBLIC KEY-----',
  ].join('\n'),
  privateKey: [
    '-----BEGIN RSA PRIVATE KEY-----',
    'MIICXAIBAAKBgQCdR9S2qLHW490SlV4nTi1Km+VKX3CbJ3fU7GBIKWljLbJtmjxvT9gVgbhfZwx6Fk+Nj8zqB4ZmcMkr3luL4e1b3bjzobD1a8HwJI43g6KO5tfM2EnO/dUp2bfcxGnFr6tTx6g0fWpDHsmSc+Y3tdJsiVGBqRUJ1H+FeJSI4wPwQQIDAQABAoGAdtWoHZ7WR+QAzCK5cf86b03c79Wusjwe6WzzznIjo4EKeI95rCzquk057jNhFPm4f+Av1n97B/mdthyalNVOTdLKRafS7bQSqqjw9DnzmJoixF7BeoB/xDMbj+SRtX0E45L46FAP9cKljNcTiZcj0UfYTbQmSI8iVi3/Vg8RvUUCQQDgx7vUSYB7LpDE3Lz00DB0k+JZM03xMKjB170nEPXSLLtdi2/jjocBO25GkrNDdZ/fPoDLAMiXlzd2nSOa6rgLAkEAsyAWG/6bjygTtBGXnl5iM3wbANgIy/HOiiXfBU0OI3kPep4VDki1MJQ6nyfztfEeJPXyCv2Pb7E7ndEYroLMYwJAB1DY3ybpRJkWYyHgEIO6IAE0K70Mu13fEDgKUvwtVALaske4g4p/AF5Dz440wWxRoL1zCahj3vMv/e9NWlxrUwJAUmcvZJ+DZp8UOWFic6uN14t/TKsVmOTblDgJ2gFxwKXflhQFMbYHDJsUQMV7WzbaHDy8pYuyIbrR5y8bAKURawJBAIr2frkOECiaInA/yiWVuEIaWdqL8vvcbpFWZKshYsIAH2hAo6J4Mm+2UiqsNWOQJwqF1IJJZhxF9SRxVxv/M98=',
    '-----END RSA PRIVATE KEY-----',
  ].join('\n'),
  googleClientID:
    '85489049022-74ums6qk67lkobk89dr087em7cuc13r5.apps.googleusercontent.com',
  googleClientSecret: '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',
  googleRedirectUrl: 'http://localhost:1337/api/sessions/oauth/google',
};
