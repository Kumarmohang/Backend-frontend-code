const userLogin = {
  tags: ['login'],
  description: 'login user',
  operationId: 'login',

  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/login',
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: ' user login succesfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/loginResponse',
          },
        },
      },
    },
  },
};

export { userLogin };
