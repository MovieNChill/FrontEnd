module.exports = {
  medias: {
    input:
      'https://movienchill-api-gateway.azuremicroservices.io/MEDIAS/v3/api-docs',
    output: {
      target: 'src/services/mediaService.ts',
      mode: 'split',
      schemas: 'src/entities/media',
      prettier: true,
      override: {
        mutator: {
          path: 'src/api/api.ts',
          name: 'mediasApi',
        },
      },
    },
  },
  users: {
    input:
      'https://movienchill-api-gateway.azuremicroservices.io/USERS/v3/api-docs',
    output: {
      target: 'src/services/userService.ts',
      mode: 'split',
      schemas: 'src/entities/user',
      override: {
        mutator: {
          path: 'src/api/api.ts',
          name: 'usersApi',
        },
      },
    },
  },
};
