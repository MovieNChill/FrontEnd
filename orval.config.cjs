module.exports = {
  medias: {
    input:
      'https://api-movienchill-mediaservice.azuremicroservices.io/v3/api-docs',
    output: {
      target: 'src/services/mediaService.ts',
      mode: 'split',
      schemas: 'src/entities/media',
      prettier: true,
      override: {
        mutator: {
          path: 'src/api/mediaApi.ts',
          name: 'mediaApi',
        },
      },
    },
  },
};
