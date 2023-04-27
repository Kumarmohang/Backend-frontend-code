const getAllSuggestions = {
  tags: ['Suggestions'],
  description: 'Get All Suggestions',
  operationId: 'getAllSuggestions',
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

      default: 10,
      type: 'number',
    },
  ],
  responses: {
    200: {
      description: 'get all suggestions successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/suggestionList',
          },
        },
      },
    },
  },
};

const suggestionsCreateRequest = {
  tags: ['Suggestions'],
  description: 'Add new suggestions',
  operationId: 'addNewSuggestions',
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/suggestionCreate',
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: 'Suggestion created successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/suggestionCreateResponse',
          },
        },
      },
    },
  },
};

const suggestionsUpdateRequest = {
  tags: ['Suggestions'],
  description: 'Update suggestion',
  operationId: 'UpdateSuggestions',
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/suggestionUpdate',
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: 'Suggestion created successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/suggestionUpdateResponse',
          },
        },
      },
    },
  },
};

export {
  getAllSuggestions,
  suggestionsCreateRequest,
  suggestionsUpdateRequest,
};
