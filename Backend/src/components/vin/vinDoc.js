const getCarDetailByVin = {
  tags: ['vin'],
  description: ' get Car detail by input vin number',
  operationId: 'vin',
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: 'vin',
      in: 'query',
      description: 'vin number',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    200: {
      description: 'get detail succesfully',
    },
  },
};
export { getCarDetailByVin };
