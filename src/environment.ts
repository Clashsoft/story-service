export const environment = {
  version: 'v1',
  port: +process.env.PORT || 56797,
  mongo: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost/stories',
  },
};
