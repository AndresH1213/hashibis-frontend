import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Hashibis Store',
        version: '1.0.0',
        license: { name: 'MIT' },
      },
      servers: [
        {
          url: 'https://api-dev.hashibis.site/v1',
          description: 'Development Server',
        },
        {
          url: 'https://api.hashibis.site/v1',
          description: 'Production Server',
        },
      ],
      tags: [
        {
          name: 'Medical History',
          description: 'Management medical history endpoints',
        },
        {
          name: 'Personal Information',
          description: 'CRUD personal information endpoints',
        },
        {
          name: 'Product',
          description: 'CRUD product endpoint only for administrator',
        },
      ],
      paths: {
        '/medical-history': {
          post: {
            summary: 'Endpoint to create medical information of the user',
            description:
              'Detail customer medical information is required to consider health risks',
            operationId: 'createMedicalHistory',
            tags: ['Medical History'],
            requestBody: {
              description:
                'Object with the data of the medical history of the client',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      allergies: {
                        type: 'string',
                        description: 'Record any allergies the client may have',
                      },
                      chronicIllnesses: {
                        type: 'string',
                        description:
                          'Record any chronic illnesses the client has, such as diabetes, asthma, heart disease, autoimmune diseases, etc. This is important because certain cannabis products may interact with medications used to treat these illnesses, and dosage adjustments may be necessary',
                      },
                      prescriptionMedication: {
                        type: 'string',
                        description:
                          'Record any prescription medication the client is taking, as some medications may interact with components of marijuana, which can affect their efficacy or cause unwanted side effects',
                      },
                      drugsUseHistory: {
                        type: 'string',
                        description:
                          'Record any drug use history, as this may indicate a higher tolerance to the effects of marijuana, which can affect the necessary dosage to achieve desired effects',
                      },
                      psychiatricIssues: {
                        type: 'string',
                        description:
                          "Record any psychiatric issues the client may have, such as anxiety, depression, sleep disorders, etc. This is important because certain cannabis products can affect a person's mood and sleep, and dosage adjustments may be necessary.",
                      },
                      isPregnancyOrLactation: {
                        type: 'boolean',
                        description:
                          'Record whether the client is pregnant or breastfeeding, as marijuana can affect fetal development and lactation',
                      },
                    },
                    required: ['allergies', 'chronicIllnesses'],
                  },
                  examples: {
                    body: {
                      summary: 'Example of full body sent in the request',
                      value: {
                        allergies: 'allergy to peanuts',
                        chronicIllnesses: 'asthma',
                        prescriptionMedication:
                          'lipitor (atorvastatin calcium)',
                        drugsUseHistory:
                          'reports using marijuana recreationally on a regular basis for the past year.',
                        psychiatricIssues: 'anxiety',
                        isPregnancyOrLactation: false,
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '201': {
                $ref: '#/components/responses/CreateMedicalHistorySuccess',
              },
              '400': { $ref: '#/components/responses/ValidationError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
        },
        '/medical-history/{id}': {
          get: {
            summary: 'Get a medical history by its userId',
            description: 'Endpoint to get a medical history by its userId',
            operationId: 'getMedicalHistory',
            tags: ['Medical History'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'user id',
                schema: { type: 'string' },
                required: true,
              },
            ],
            responses: {
              '200': {
                $ref: '#/components/responses/GetMedicalHistorySuccess',
              },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
          },
          patch: {
            summary: 'Update a medical history by its userId.',
            description: 'Endpoint to update the medical history of a user',
            operationId: 'updateMedicalHistory',
            tags: ['Medical History'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'User ID',
                required: true,
                schema: { type: 'string' },
              },
            ],
            requestBody: {
              description: 'Medical History object to be updated',
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/MedicalHistoryItem' },
                },
              },
            },
            responses: {
              '200': {
                $ref: '#/components/responses/UpdateMedicalHistorySuccess',
              },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
        },
        '/personal-information': {
          post: {
            summary: 'Endpoint to create personal information of the user',
            description:
              'Collecting basic personal information is essential for identification and communication with customers',
            operationId: 'createPersonalInformation',
            tags: ['Personal Information'],
            requestBody: {
              description:
                'Data that should be sent in the body of the request when creating or updating a personal information item',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        minLength: 1,
                        description: 'Name of the person',
                      },
                      lastname: {
                        type: 'string',
                        minLength: 1,
                        description: 'Lastname of the person',
                      },
                      birthday: {
                        type: 'string',
                        format: 'date',
                        description:
                          'Birthday of the person, to verify the customers age',
                      },
                      address: {
                        type: 'string',
                        description: 'Address of the person',
                      },
                      identification: {
                        type: 'string',
                        description:
                          'Identification of the person, ensure that are on duplicates or frauds',
                      },
                      identificationType: {
                        type: 'string',
                        description: 'Type of identification of the person',
                        enum: ['CC', 'PA', 'NIT'],
                      },
                      phone: {
                        type: 'string',
                        pattern: '^[0-9]{10}$',
                        description: 'Phone of the person',
                      },
                      hasMedicalHistory: {
                        type: 'boolean',
                        default: false,
                        description:
                          'Indicates if the person has a medical history',
                      },
                      cannabisExperience: {
                        type: 'number',
                        description:
                          'Indicates the experience of the person with cannabis',
                        enum: [1, 2, 3, 4],
                      },
                      lastOrder: {
                        type: 'string',
                        description: 'Date of the last order of the person',
                        format: 'date',
                      },
                      ordersNumber: {
                        type: 'number',
                        description: 'Number of orders of the person',
                        default: 0,
                      },
                    },
                    required: [
                      'name',
                      'lastname',
                      'birthday',
                      'identification',
                      'identificationType',
                      'cannabisExperience',
                    ],
                  },
                  examples: {
                    body: {
                      $ref: '#/components/examples/PersonalInformationBody',
                    },
                  },
                },
              },
            },
            responses: {
              '201': {
                $ref: '#/components/responses/CreatePersonalInformationSuccess',
              },
              '400': { $ref: '#/components/responses/ValidationError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
          patch: {
            summary: 'Update a Personal Information by its id.',
            description:
              'Endpoint to update the personal information of the user that makes the request',
            operationId: 'updatePersonalInformation',
            tags: ['Personal Information'],
            requestBody: {
              description: 'Personal Information object to be updated',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PersonalInformationItem',
                  },
                },
              },
            },
            responses: {
              '200': {
                $ref: '#/components/responses/UpdatePersonalInformationSuccess',
              },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
        },
        '/personal-information/{id}': {
          get: {
            summary: 'Get an personal information by user id.',
            description: 'Endpoint get an personal information by user id',
            operationId: 'getPersonalInformation',
            tags: ['Personal Information'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'personal information id',
                schema: { type: 'string' },
                required: true,
              },
            ],
            responses: {
              '200': {
                $ref: '#/components/responses/GetPersonalInformationSuccess',
              },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
          },
        },
        '/product': {
          post: {
            summary: 'Endpoint to create a new product for sale',
            description:
              'Use this endpoint to add a new product to the available inventory for sale on the website. Include information such as product name, type, concentration, price, and effects.',
            operationId: 'createProduct',
            tags: ['Product'],
            requestBody: {
              description:
                'Object that represents the request body in create a product',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        minLength: 1,
                        description:
                          'Name of the product being offered for sale',
                      },
                      type: {
                        type: 'string',
                        description:
                          'Type of the product being offered for sale',
                        enum: [
                          'flower',
                          'cream',
                          'edible',
                          'topical',
                          'vape',
                          'extract',
                        ],
                      },
                      cannabinoidContent: {
                        type: 'string',
                        description:
                          'Amount of THC, CBD, and other cannabinoids found in the product',
                      },
                      concentration: {
                        type: 'string',
                        description:
                          'Concentration of cannabinoids per serving or per ml',
                      },
                      measureUnitConcentration: {
                        type: 'string',
                        enum: ['ml', 'portion'],
                        description:
                          'Unit of measure of the concentration of the product, ml or portion',
                      },
                      extractionMethod: {
                        type: 'string',
                        description: 'Method of extraction of the product',
                        enum: ['CO2', 'butane', 'ethanol', 'solventless'],
                      },
                      origin: {
                        type: 'string',
                        description:
                          'Variety of the cannabis from which the cannabinoids from the cannabis',
                        enum: ['indica', 'sativa', 'hybrid'],
                      },
                      presentation: {
                        type: 'string',
                        description:
                          'The form in which the product is presented (e.g. bottle, tube, vaporizer).',
                        enum: ['bottle', 'tube', 'vaporizer'],
                      },
                      price: {
                        type: 'number',
                        description: 'Price of the product',
                      },
                      effects: {
                        type: 'string',
                        description:
                          'Description of the effects of the product on the body and mind',
                      },
                      family: {
                        type: 'string',
                        description:
                          'which family of cannabinoids the product belongs to (e.g. THC, CBD, CBN, CBG).',
                        enum: ['THC', 'CBD', 'CBN', 'CBG'],
                      },
                      recommendedPersonalDose: {
                        type: 'string',
                        description:
                          'Allow the customer to know how much to consume per serving, helping them avoid overdose or excessive consumption.',
                      },
                      scientificResearch: {
                        type: 'array',
                        items: { type: 'string' },
                        description:
                          'List of scientific research related to the product',
                      },
                    },
                    required: ['name', 'type'],
                  },
                  examples: {
                    body: { $ref: '#/components/examples/ProductBody' },
                  },
                },
              },
            },
            responses: {
              '200': { $ref: '#/components/responses/CreateProductSuccess' },
              '400': { $ref: '#/components/responses/ValidationError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
        },
        '/products': {
          get: {
            summary: 'Get a all products, limit 20.',
            description: 'Endpoit to get all the products',
            operationId: 'getProducts',
            tags: ['Product'],
            responses: {
              '200': { $ref: '#/components/responses/GetAllProductsSuccess' },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
          },
        },
        '/product/{id}': {
          get: {
            summary: 'Get a product by its id.',
            description: 'Endpoint to get a product by its id.',
            operationId: 'getProduct',
            tags: ['Product'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'product id',
                schema: { type: 'string' },
                required: true,
              },
            ],
            responses: {
              '200': { $ref: '#/components/responses/GetProductSuccess' },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
          },
          patch: {
            summary: 'Update a product by its id.',
            description: 'Endpoint to update the properties of a product.',
            operationId: 'updateProduct',
            tags: ['Product'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'Product ID',
                required: true,
                schema: { type: 'string' },
              },
            ],
            requestBody: {
              description: 'Product object to be updated',
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ProductItem' },
                },
              },
            },
            responses: {
              '200': { $ref: '#/components/responses/UpdateProductSuccess' },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
          delete: {
            summary: 'Delete a product by its ID',
            description: 'Deletes a product from the system by its unique ID.',
            operationId: 'deleteProduct',
            tags: ['Product'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'ID of the product to be deleted',
                required: true,
                schema: { type: 'string' },
              },
            ],
            responses: {
              '204': { description: 'Product deleted successfully' },
              '400': { $ref: '#/components/responses/ValidationError' },
              '404': { $ref: '#/components/responses/NotFoundError' },
              '500': { $ref: '#/components/responses/InternalServerError' },
            },
            security: [{ auth: [] }],
          },
        },
      },
      components: {
        schemas: {
          Error: {
            type: 'object',
            description: 'Object that represents an error in the system',
            required: ['message'],
            properties: {
              code: { type: 'string', description: 'Error code' },
              message: { type: 'string', description: 'Error message' },
            },
          },
          ProductItem: {
            type: 'object',
            description: 'Object that represents a product',
            properties: {
              name: { type: 'string' },
              type: { type: 'string' },
              cannabinoidContent: { type: 'string' },
              concentration: { type: 'string' },
              measureUnitConcentration: { type: 'string' },
              extractionMethod: { type: 'string' },
              origin: { type: 'string' },
              presentation: { type: 'string' },
              price: { type: 'number' },
              effects: { type: 'string' },
              family: { type: 'string' },
              recommendedPersonalDose: { type: 'string' },
              scientificResearch: { type: 'array', items: { type: 'string' } },
            },
          },
          MedicalHistoryItem: {
            type: 'object',
            properties: {
              allergies: {
                type: 'string',
                description: 'Record any allergies the client may have',
              },
              chronicIllnesses: {
                type: 'string',
                description: 'Record any chronic illnesses the client has',
              },
              prescriptionMedication: {
                type: 'string',
                description:
                  'Record any prescription medication the client is taking',
              },
              drugsUseHistory: {
                type: 'string',
                description: 'Record any drug use history',
              },
              psychiatricIssues: {
                type: 'string',
                description:
                  'Record any psychiatric issues the client may have',
              },
              isPregnancyOrLactation: {
                type: 'boolean',
                description:
                  'Record whether the client is pregnant or breastfeeding',
              },
            },
          },
          PersonalInformationItem: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '12345' },
              name: { type: 'string', example: 'John' },
              lastname: { type: 'string', example: 'Doe' },
              birthday: {
                type: 'string',
                format: 'date',
                example: '1990-01-01',
              },
              address: { type: 'string', example: '123 Main St' },
              identification: { type: 'string', example: '123456789' },
              identificationType: { type: 'string', example: 'CC' },
              phone: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                example: '1234567890',
              },
              hasMedicalHistory: { type: 'boolean', example: true },
              cannabisExperience: { type: 'number', example: 2 },
              lastOrder: {
                type: 'string',
                format: 'date',
                example: '2022-04-01',
              },
              ordersNumber: { type: 'number', example: 5 },
            },
          },
        },
        responses: {
          ValidationError: {
            description:
              'Object that represents an error response due to validation errors',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  description:
                    'Array that contains N errors generated in the system',
                  items: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
          NotFoundError: {
            description:
              'Object that represents an error response because the resource being accessed could not be found',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  description:
                    'Array that contains N errors generated in the system',
                  items: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
          InternalServerError: {
            description:
              'Object that represents an error response due to an internal error in the system',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  description:
                    'Array that contains N errors generated in the system',
                  items: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
          CreateProductSuccess: {
            description: 'Object that is returned when a product is created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of create product success',
                    },
                    item: { $ref: '#/components/schemas/ProductItem' },
                  },
                },
              },
            },
          },
          GetProductSuccess: {
            description: 'Object that is returned when a product is created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of get product success',
                    },
                    item: { $ref: '#/components/schemas/ProductItem' },
                  },
                },
              },
            },
          },
          GetAllProductsSuccess: {
            description: 'A list of products',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message for get all products success',
                    },
                    items: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/ProductItem' },
                    },
                  },
                },
              },
            },
          },
          UpdateProductSuccess: {
            description:
              'Object that is returned when a product is successfully updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of update product success',
                    },
                    item: { $ref: '#/components/schemas/ProductItem' },
                  },
                },
              },
            },
          },
          CreateMedicalHistorySuccess: {
            description: 'Medical history successfully created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description:
                        'Message indicating the success of the operation',
                      example: 'Medical history successfully created',
                    },
                    medicalHistory: {
                      $ref: '#/components/schemas/MedicalHistoryItem',
                    },
                  },
                },
              },
            },
          },
          GetMedicalHistorySuccess: {
            description:
              'Object that is returned when an medical history is successfully retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message for get medical history success',
                    },
                    item: { $ref: '#/components/schemas/MedicalHistoryItem' },
                  },
                },
              },
            },
          },
          UpdateMedicalHistorySuccess: {
            description:
              'Object that is returned when a medical history is successfully updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of update medical history success',
                    },
                    item: { $ref: '#/components/schemas/MedicalHistoryItem' },
                  },
                },
              },
            },
          },
          CreatePersonalInformationSuccess: {
            description: 'Personal information created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Personal information created successfully',
                    },
                    item: {
                      $ref: '#/components/schemas/PersonalInformationItem',
                    },
                  },
                },
              },
            },
          },
          GetPersonalInformationSuccess: {
            description:
              'Object that is returned when a personal information is created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description:
                        'Message of get personal information success',
                    },
                    item: {
                      $ref: '#/components/schemas/PersonalInformationItem',
                    },
                  },
                },
              },
            },
          },
          UpdatePersonalInformationSuccess: {
            description:
              'Object that is returned when a personal information is successfully updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description:
                        'Message of update personal information success',
                    },
                    item: {
                      $ref: '#/components/schemas/PersonalInformationItem',
                    },
                  },
                },
              },
            },
          },
        },
        examples: {
          ProductBody: {
            summary: 'Example of a product body',
            value: {
              name: 'CBD Oil',
              type: 'extract',
              cannabinoidContent: 'CBD 25%, CBG 2%',
              concentration: '20mg/portion',
              measureUnitConcentration: 'portion',
              extractionMethod: 'ethanol',
              origin: 'hybrid',
              presentation: 'bottle',
              price: 70,
              effects: 'Calming, pain relief, anti-inflammatory',
              family: 'CBD',
              recommendedPersonalDose: '1 portion before bedtime',
              scientificResearch: [
                'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6140266/',
                'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7023045/',
              ],
            },
          },
          PersonalInformationBody: {
            summary: 'Example of personal information body',
            value: {
              name: 'John',
              lastname: 'Doe',
              birthday: '1990-01-01',
              address: '123 Main St',
              identification: '123456789',
              identificationType: 'CC',
              phone: '1234567890',
              hasMedicalHistory: true,
              cannabisExperience: 2,
              lastOrder: '2022-04-01',
              ordersNumber: 5,
            },
          },
        },
        securitySchemes: { auth: { type: 'http', scheme: 'bearer' } },
      },
    },
  });
  return spec;
};
