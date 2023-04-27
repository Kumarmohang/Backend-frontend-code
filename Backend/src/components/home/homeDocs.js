const getAsset = {
  tags: ['home'],
  description: ' Get all asset classes and filter ',
  operationId: 'getAssetClass',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'search',
      in: 'query',
      description: 'search value',
      // default: '',
      // allowEmptyValue: true,
      type: 'string',
    },
    {
      name: 'make',
      in: 'query',
      description: 'Make',
      type: 'string',
    },
    {
      name: 'vin',
      in: 'query',
      description: 'Vin no',
      type: 'string',
    },
    // {
    //   name: 'year',
    //   in: 'query',
    //   type: 'string',
    //   description:
    //     'Year filter with operator and range support, Supported operator [gt(>) ,lt(<), lte(<=), gte(>=), eq(==), ne(!=)], operator::year (:: separator) example: gte::2014 or Year range year1-year2 example: 2014-2015, year only example:2015',
    //   examples: {
    //     Operator: { value: 'gte::2014' },
    //     'Range based': { value: '2014-2015' },
    //     'Only year': { value: '2015' },
    //   },
    // },
  ],
  responses: {
    200: {
      description: ' get  asset and classes information',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/getAssetdefinition',
          },
        },
      },
    },
  },
};

const getList = {
  tags: ['home'],
  description: ' Get all list',
  security: [{ BearerAuth: [] }],
  operationId: 'getList',
  parameters: [
    {
      name: 'type',
      in: 'path',
      allowEmptyValue: false,
      schema: {
        enum: ['dealers', 'auction_houses', 'specific_car_sources', 'car_type'],
        type: 'string',
      },
      example: 'car_type',
    },
  ],
  responses: {
    200: {
      description: ' get  asset and classes information',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/getListDefinition',
          },
        },
      },
    },
  },
};

const getSearchResult = {
  tags: ['home'],
  description: ' Get Search Result',
  operationId: 'details',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'group',
      in: 'query',
      description: 'group',
      type: 'string',
      example: 'All',
      allowReserved: true,
      required: true,
    },
    {
      name: 'subCat',
      in: 'query',
      description: 'sub category',
      type: 'string',
      value: 'All',
      allowReserved: true,
    },
    {
      name: 'pageNo',
      in: 'query',
      description: 'Default',
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
      description:
        'search keywords such as chassis number ,car name,specification',
      type: 'string',
      // default: 'f40',
    },
    {
      name: 'vin',
      in: 'query',
      description: 'Vin no',
      type: 'string',
      // example: '',
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
      name: 'roof_top',
      in: 'query',
      type: 'string',
      description: 'Type of roof top (open | closed)',
      schema: {
        enum: ['open', 'closed'],
        type: 'string',
      },
    },
    {
      name: 'no_of_seats',
      in: 'query',
      type: 'string',
      description: 'Number of seats in car',
      schema: {
        enum: ['1', '2', 'gt::2'],
        type: 'string',
      },
    },
    {
      name: 'segment',
      in: 'query',
      type: 'string',
      description: 'Number of seats in car',
      schema: {
        enum: ['Other', 'Racing Cars'],
        type: 'string',
      },
    },
  ],
  responses: {
    200: {
      description: ' get dealer details successfully',
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
export { getAsset, getList, getSearchResult };
