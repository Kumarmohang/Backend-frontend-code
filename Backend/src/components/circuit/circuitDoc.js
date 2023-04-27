const getCircuits = {
  tags: ['circuits'],
  description: ' get all circuits',
  operationId: 'circuits',

  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'pageNo',
      in: 'query',

      default: 0,
      type: 'number',
    },
    {
      name: 'fetchSize',
      in: 'query',

      default: 21,
      type: 'number',
    },
    {
      name: 'search',
      in: 'query',
      description: 'search circuits name',
      type: 'string',
      default: 'Aintree',
    },
  ],
  responses: {
    200: {
      description: ' get all circuits succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/commonResponse',
          },
        },
      },
    },
    404: {
      description: ' Record not found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/error404Schema',
          },
        },
      },
    },
  },
};
const getCircuitDetail = {
  tags: ['circuits'],
  description: ' get  circuit details',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'circuit ID',
      required: true,
      type: 'string',
      example: '61b86061b5da35faf1b8743b',
    },
    {
      name: 'type',
      in: 'query',
      description: 'Default',
      value: 'circuits',
      type: 'string',
      required: true,
    },
  ],
  responses: {
    200: {
      description: ' get  circuit details succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/circuit',
          },
        },
      },
    },
    404: {
      description: ' Record not found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/error404Schema',
          },
        },
      },
    },
  },
};
export { getCircuits, getCircuitDetail };
