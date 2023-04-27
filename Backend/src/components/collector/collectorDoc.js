const getCollectors = {
  tags: ['collector'],
  description: ' get all collector',
  operationId: 'collecctor',
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
  ],
  responses: {
    200: {
      description: ' get all collectors succesfully',
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
const getCollectorDetail = {
  tags: ['collector'],
  description: ' get  collector details',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'collector ID',
      required: true,
      type: 'string',
      example: '6197497f18016739a8f22b5c',
    },
    {
      name: 'type',
      in: 'query',
      description: 'Default',
      value: 'influencers',
      type: 'string',
      required: true,
    },
  ],
  responses: {
    200: {
      description: ' get  collector details succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/collector',
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
export { getCollectors, getCollectorDetail };
