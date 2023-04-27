const getClubs = {
  tags: ['clubs'],
  description: ' get all clubs',
  operationId: 'clubs',
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
      description: ' get all clubs succesfully',
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
const getClubDetail = {
  tags: ['clubs'],
  description: ' get  club details',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'club ID',
      required: true,
      type: 'string',
      example: '60f52ac290b42960359612ff',
    },
    {
      name: 'type',
      in: 'query',
      description: 'Default',
      value: 'clubs',
      type: 'string',
    },
  ],
  responses: {
    200: {
      description: ' get  club details succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/club',
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
export { getClubs, getClubDetail };
