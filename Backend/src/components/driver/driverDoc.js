const getDrivers = {
  tags: ['driver'],
  description: ' get all drivers',
  operationId: 'driver',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'pageNo',
      in: 'query',
      description: 'Page No',
      default: 0,
      type: 'number',
    },
    {
      name: 'fetchSize',
      in: 'query',
      description: 'Default',
      value: 20,
      type: 'number',
    },
    {
      name: 'search',
      in: 'query',
      description: 'search c drivers',
      type: 'string',
      default: 'michael',
    },
  ],
  responses: {
    201: {
      description: ' get all drivers succesfully',
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
const getDriverDetail = {
  tags: ['driver'],
  description: ' get  driver details',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'driver ID',
      required: true,
      type: 'string',
      example: '618ce2c9c82a4e2543a683b0',
    },
    {
      name: 'type',
      in: 'query',
      description: 'Default',
      value: 'drivers',
      type: 'string',
    },
  ],
  responses: {
    200: {
      description: ' get driver details succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/driver',
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
export { getDrivers, getDriverDetail };
