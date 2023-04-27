const getCarDetail = {
  tags: ['home'],
  description: ' get  car details',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'cars ID',

      type: 'string',
      example: '61d837ebf6121069f3381272',
      required: true,
    },
    {
      name: 'group',
      in: 'query',
      value: 'Cars',
      type: 'string',
      required: true,
    },
  ],
  responses: {
    200: {
      description: ' get car details succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/car',
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

const getAllCars = {
  tags: ['car'],
  description: 'Get All car models',
  operationId: 'getCarList',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'search',
      in: 'query',
      default: '',
      type: 'string',
      description: 'Search term',
    },
    {
      name: 'make',
      in: 'query',
      type: 'string',
      description: 'Make filter',
      schema: {
        enum: [
          'Bugatti',
          'Ferrari',
          'Lamborghini',
          'McLaren',
          'Mercedes-Benz',
          'Pagani',
          'Porsche',
        ],
        type: 'string',
      },
    },
    {
      name: 'year',
      in: 'query',
      type: 'string',
      description:
        'Year filter with operator and range support, Supported operator [gt(>) ,lt(<), lte(<=), gte(>=), eq(==), ne(!=)], operator::year (:: separator) example: gte::2014 or Year range year1-year2 example: 2014-2015, year only example:2015',
      examples: {
        Operator: { value: 'gte::2014' },
        'Range based': { value: '2014-2015' },
        'Only year': { value: '2015' },
      },
    },
    {
      name: 'carType',
      in: 'query',
      schema: {
        enum: ['Latest', 'Antique', 'Classic', 'Others'],
        type: 'string',
      },
    },
    {
      name: 'releaseStatus',
      in: 'query',
      schema: {
        enum: ['Upcoming', 'Released'],
        type: 'string',
      },
    },
    {
      name: 'sort_key',
      in: 'query',
      schema: {
        enum: ['title', 'launch_year'],
        type: 'string',
      },
    },
    {
      name: 'sort_order',
      in: 'query',
      schema: {
        enum: ['desc', 'asc'],
        type: 'string',
      },
    },

    {
      name: 'pageNo',
      in: 'query',

      default: 0,
      type: 'number',
    },
    {
      name: 'fetchSize',
      in: 'query',

      default: 10,
      type: 'number',
    },
  ],
  responses: {
    200: {
      description: 'get all cars successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/carList',
          },
        },
      },
    },
    404: {
      description: 'Record not found',
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

export { getCarDetail, getAllCars };
