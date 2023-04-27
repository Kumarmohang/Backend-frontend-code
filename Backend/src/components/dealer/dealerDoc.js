const getDealers = {
  tags: ['dealer'],
  description: ' get all dealer',
  operationId: 'dealer',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'pageNo',
      in: 'query',
      description: 'Page No',
      type: 'Number',
      default: 0,
    },

    {
      name: 'fetchSize',
      in: 'query',
      description: 'Default',
      value: 20,
      type: 'number',
    },
  ],
  responses: {
    200: {
      description: ' get all dealers succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/dealersResult',
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
const getDealerDetail = {
  tags: ['dealer'],
  description: ' Dealers car search ',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'dealer',
      in: 'query',
      description: 'dealer name',
      required: true,
      type: 'string',
      example: `HK-Engineering`,
    },
    {
      name: 'group',
      in: 'query',
      description: 'group',
      type: 'string',
      value: `Cars+For+Sale`,
      allowReserved: true,
    },
    {
      name: 'subCat',
      in: 'query',
      description: 'sub category',
      type: 'string',
      value: 'HK-Engineering',
      allowReserved: true,
    },
    {
      name: 'pageNo',
      in: 'query',
      description: 'Default',
      default: 0,
      type: 'integer',
      required: true,
    },
    {
      name: 'fetchSize',
      in: 'query',
      description: 'Default',
      value: 20,
      type: 'integer',
      required: true,
    },
    {
      name: 'showSideBar',
      in: 'query',
      description: 'Variable to disable and enable sidebar',
      type: 'boolean',
      default: false,
    },
  ],
  responses: {
    200: {
      description: ' get dealer details succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/dealersPageResponse',
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
export { getDealers, getDealerDetail };
