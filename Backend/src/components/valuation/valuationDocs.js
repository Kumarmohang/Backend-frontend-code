const carValuation = {
  tags: ['valuation'],
  description: 'Car Valuation',
  operationId: 'valuation',
  security: [{ BearerAuth: [] }],

  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/valuation',
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: 'user login successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/valuationResponse',
          },
        },
      },
    },
  },
};

export { carValuation };
