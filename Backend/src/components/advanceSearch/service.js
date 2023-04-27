/* eslint-disable no-extra-boolean-cast */
import { ApiError } from '../../util/error';
import { COLLECTION_MODEL_MAP } from '../common/models/modelMapping';
import {
  getDataForAdvanceSearch,
  getDataCount,
} from '../common/services/dbUtils';
import { carsListParser } from './serializer';

const SUPPORTED_OPERATOR = ['gt', 'lt', 'eq', 'ne', 'gte', 'lte'];
const RELEASE_STATUS = ['upcoming', 'released'];
const SORT_ORDER_MAPPING = { desc: -1, asc: 1 };
/**
 * This function separate value and mongo operator and retrun mongo query.
 * @param {String} valueWithOperator - operator and value separated by ::.
 * @returns {{operator: string, value: string}} operator and value
 */
const separateValueAndOperator = (valueWithOperator) => {
  const splitOperatorAndValue = valueWithOperator.split('::');
  if (splitOperatorAndValue.length === 2) {
    const [operator, value] = splitOperatorAndValue;
    if (SUPPORTED_OPERATOR.includes(operator)) {
      return {
        operator: `$${operator}`,
        value,
      };
    }
  } else if (
    splitOperatorAndValue.length === 1 &&
    splitOperatorAndValue[0].length === 4
  ) {
    return {
      operator: `$eq`,
      value: splitOperatorAndValue[0],
    };
  } else {
    throw new ApiError(
      `Operator must be one of ${SUPPORTED_OPERATOR.join(', ')}`,
      400
    );
  }
};
/**
 * @description Get data for parameterized search.
 * @param {Object} query - query parameters.
 * @returns {Object} - data.
 */
export const getAllCar = async (query) => {
  const {
    pageNo,
    fetchSize,
    search,
    count,
    make,
    series,
    categoryOfCar,
    gearType,
    driveType,
    roofType,
    noOfSeats,
    noOfDoors,
    capacityFrom,
    capacityTo,
    maxPowerFrom,
    maxPowerTo,
    makeYearFrom,
    makeYearTo,
    sortKey,
    sortOrderStr = 'desc',
    releaseStatus,
  } = query;

  const sortOrder = SORT_ORDER_MAPPING[sortOrderStr];
  if (!sortOrder) {
    throwApiError('Sort order must be one of desc, asc', 400);
  }
  const pageNoInt = Number.parseInt(pageNo, 10);
  const fetchSizeInt = Number.parseInt(fetchSize, 10);
  const modelInstance = COLLECTION_MODEL_MAP.cars;
  const sortOrderInt = Number.parseInt(sortOrder, 10);

  let dbQuery = null;
  const searchArray = typeof search === 'string' ? search.split(' ') : [search];

  const queryArray =
    search && searchArray.length > 0
      ? searchArray.map((elem) => ({
          tag_string: {
            $regex: new RegExp(`.*${elem}.*`, 'img'),
          },
        }))
      : [];

  if (!!make) {
    if (make !== 'all')
      queryArray.push({
        brand_name: { $in: make.split(',') },
      });
  }

  if (!!series) {
    queryArray.push({
      series: { $in: series.split(',') },
    });
  }

  if (!!categoryOfCar) {
    if (categoryOfCar === 'all') {
      queryArray.push({});
    } else if (categoryOfCar === 'Unknown') {
      queryArray.push({
        $or: [
          {
            category: { $in: categoryOfCar.split(',') },
          },
          {
            category: { $exists: false },
          },
        ],
      });
    } else {
      queryArray.push({
        category: categoryOfCar,
      });
    }
  }

  if (!!gearType) {
    if (gearType === 'Unknown') {
      queryArray.push({
        $or: [
          {
            $and: [
              {
                $expr: {
                  $allElementsTrue: {
                    $map: {
                      input: { $objectToArray: '$year_wise_specifications' },
                      in: {
                        $or: [
                          {
                            $eq: [
                              '$$this.v.Gearbox.Transmission Type.finalSpecValueStr',
                              gearType,
                            ],
                          },
                          {
                            $eq: [
                              {
                                $type: '$$this.v.Gearbox.Transmission Type',
                              },
                              'missing',
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $or: [
                  {
                    'specifications.Gearbox.Transmission Type': {
                      $exists: false,
                    },
                  },
                  {
                    'specifications.Gearbox.Transmission Type.finalSpecValueStr':
                      gearType,
                  },
                ],
              },
            ],
          },
        ],
      });
    } else {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $eq: [
                  '$$this.v.Gearbox.Transmission Type.finalSpecValueStr',
                  gearType,
                ],
              },
            },
          },
        },
      });
    }
  }
  if (!!driveType) {
    if (driveType === 'Unknown') {
      queryArray.push({
        $or: [
          {
            $and: [
              {
                $expr: {
                  $allElementsTrue: {
                    $map: {
                      input: { $objectToArray: '$year_wise_specifications' },
                      in: {
                        $or: [
                          {
                            $eq: [
                              '$$this.v.Engine.Drive Type.finalSpecValueStr',
                              driveType,
                            ],
                          },
                          {
                            $eq: [
                              {
                                $type: '$$this.v.Engine.Drive Type',
                              },
                              'missing',
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $or: [
                  {
                    'specifications.Engine.Drive Type': {
                      $exists: false,
                    },
                  },
                  {
                    'specifications.Engine.Drive Type.finalSpecValueStr':
                      driveType,
                  },
                ],
              },
            ],
          },
        ],
      });
    } else {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $eq: [
                  '$$this.v.Engine.Drive Type.finalSpecValueStr',
                  driveType,
                ],
              },
            },
          },
        },
      });
    }
  }

  if (!!roofType) {
    if (roofType === 'all') {
      queryArray.push({});
    } else if (roofType === 'Unknown') {
      queryArray.push({
        $or: [
          {
            roof_top: { $in: roofType.split(',') },
          },
          {
            roof_top: { $exists: false },
          },
        ],
      });
    } else {
      queryArray.push({
        roof_top: { $in: roofType.split(',') },
      });
    }
  }

  if (!!noOfSeats) {
    if (noOfSeats === 'Unknown') {
      queryArray.push({
        $or: [
          {
            $and: [
              {
                $expr: {
                  $allElementsTrue: {
                    $map: {
                      input: { $objectToArray: '$year_wise_specifications' },
                      in: {
                        $or: [
                          {
                            $eq: [
                              '$$this.v.Body.Seating Capacity.finalSpecValueStr',
                              noOfSeats,
                            ],
                          },
                          {
                            $eq: [
                              {
                                $type: '$$this.v.Body.Seating Capacity',
                              },
                              'missing',
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $or: [
                  {
                    'specifications.Body.Seating Capacity': {
                      $exists: false,
                    },
                  },
                  {
                    'specifications.Body.Seating Capacity.finalSpecValueStr':
                      noOfSeats,
                  },
                ],
              },
            ],
          },
        ],
      });
    } else if (noOfSeats === '>5') {
      // queryArray.push({
      //   $expr: {
      //     $anyElementTrue: {
      //       $map: {
      //         input: { $objectToArray: '$year_wise_specifications' },
      //         in: {
      //           $gt: ['$$this.v.Body.Seating Capacity.finalSpecValueStr', 6],
      //         },
      //       },
      //     },
      //   },
      // });

      queryArray.push({
        $or: [
          {
            $expr: {
              $anyElementTrue: {
                $map: {
                  input: { $objectToArray: '$year_wise_specifications' },
                  in: {
                    $gt: [
                      '$$this.v.Body.Seating Capacity.normalisedNumValue',
                      5,
                    ],
                  },
                },
              },
            },
          },
          {
            'specifications.Body.Seating Capacity.normalisedNumValue': {
              $gt: 5,
            },
          },
        ],
      });
    } else {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $eq: [
                  '$$this.v.Body.Seating Capacity.finalSpecValueStr',
                  noOfSeats,
                ],
              },
            },
          },
        },
      });
    }
  }

  if (!!noOfDoors) {
    if (noOfDoors === 'Unknown') {
      queryArray.push({
        $or: [
          {
            $and: [
              {
                $expr: {
                  $allElementsTrue: {
                    $map: {
                      input: { $objectToArray: '$year_wise_specifications' },
                      in: {
                        $or: [
                          {
                            $eq: [
                              '$$this.v.Body.Doors.finalSpecValueStr',
                              noOfDoors,
                            ],
                          },
                          {
                            $eq: [
                              {
                                $type: '$$this.v.Body.Doors',
                              },
                              'missing',
                            ],
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $or: [
                  {
                    'specifications.Body.Doors': {
                      $exists: false,
                    },
                  },
                  {
                    'specifications.Body.Doors.finalSpecValueStr': noOfDoors,
                  },
                ],
              },
            ],
          },
        ],
      });
    } else if (noOfDoors === '>5') {
      queryArray.push({
        $or: [
          {
            $expr: {
              $anyElementTrue: {
                $map: {
                  input: { $objectToArray: '$year_wise_specifications' },
                  in: {
                    $gt: ['$$this.v.Body.Doors.normalisedNumValue', 5],
                  },
                },
              },
            },
          },
          {
            'specifications.Body.Doors.normalisedNumValue': { $gt: 5 },
          },
        ],
      });
    } else {
      queryArray.push({
        $or: [
          {
            $expr: {
              $anyElementTrue: {
                $map: {
                  input: { $objectToArray: '$year_wise_specifications' },
                  in: {
                    $eq: ['$$this.v.Body.Doors.finalSpecValueStr', noOfDoors],
                  },
                },
              },
            },
          },
          {
            'specifications.Body.Doors.finalSpecValueStr': noOfDoors,
          },
        ],
      });
    }
  }

  if (!!capacityFrom || !!capacityTo) {
    const capacityF = parseFloat(capacityFrom, 10);
    const capacityT = parseFloat(capacityTo, 10);
    console.log('capacity======', capacityT);
    // parseFloat(capacityTo, 10);
    if (capacityFrom && capacityTo) {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $and: [
                  {
                    $gte: [
                      '$$this.v.Engine.Capacity.normalisedNumValue',
                      capacityF,
                    ],
                  },
                  {
                    $lte: [
                      '$$this.v.Engine.Capacity.normalisedNumValue',
                      capacityT,
                    ],
                  },
                ],
              },
            },
          },
        },
      });
    } else if (capacityFrom && !capacityTo) {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $gte: [
                  '$$this.v.Engine.Capacity.normalisedNumValue',
                  capacityF,
                ],
              },
            },
          },
        },
      });
    } else if (!capacityFrom && capacityTo) {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $and: [
                  {
                    $lte: [
                      '$$this.v.Engine.Capacity.normalisedNumValue',
                      capacityT,
                    ],
                  },
                  {
                    $ne: [
                      {
                        $type: '$$this.v.Engine.Capacity.normalisedNumValue',
                      },
                      'missing',
                    ],
                  },
                ],
              },
            },
          },
        },
      });
    }
  }

  if (!!maxPowerFrom || !!maxPowerTo) {
    const maxPowerF = parseFloat(maxPowerFrom, 10);
    const maxPowerT = parseFloat(maxPowerTo, 10);
    if (maxPowerFrom && maxPowerTo) {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $and: [
                  {
                    $gte: [
                      '$$this.v.Engine.Maximum Power.normalisedNumValue',
                      maxPowerF,
                    ],
                  },
                  {
                    $lte: [
                      '$$this.v.Engine.Maximum Power.normalisedNumValue',
                      maxPowerT,
                    ],
                  },
                ],
              },
            },
          },
        },
      });
    } else if (maxPowerFrom && !maxPowerTo) {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                $gte: [
                  '$$this.v.Engine.Maximum Power.normalisedNumValue',
                  maxPowerF,
                ],
              },
            },
          },
        },
      });
    } else if (!maxPowerFrom && maxPowerTo) {
      queryArray.push({
        $expr: {
          $anyElementTrue: {
            $map: {
              input: { $objectToArray: '$year_wise_specifications' },
              in: {
                // $lte: [
                //   '$$this.v.Engine.Maximum Power.normalisedNumValue',
                //   maxPowerT,
                // ],
                $and: [
                  {
                    $lte: [
                      '$$this.v.Engine.Maximum Power.normalisedNumValue',
                      maxPowerT,
                    ],
                  },
                  {
                    $ne: [
                      {
                        $type:
                          '$$this.v.Engine.Maximum Power.normalisedNumValue',
                      },
                      'missing',
                    ],
                  },
                ],
              },
            },
          },
        },
      });
    }
  }

  if (!!makeYearFrom || !!makeYearTo) {
    if (makeYearFrom && makeYearTo) {
      if (makeYearFrom.match(/^\d\d\d\d$/) || makeYearTo.match(/^\d\d\d\d$/)) {
        queryArray.push({
          launch_year: {
            $gte: Number.parseInt(makeYearFrom, 10),
            $lte: Number.parseInt(makeYearTo, 10),
          },
        });
      }
    } else if (makeYearFrom && !makeYearTo) {
      if (makeYearFrom.match(/^\d\d\d\d$/)) {
        queryArray.push({
          launch_year: {
            $gte: Number.parseInt(makeYearFrom, 10),
          },
        });
      }
    } else if (!makeYearFrom && makeYearTo) {
      if (makeYearTo.match(/^\d\d\d\d$/)) {
        queryArray.push({
          launch_year: {
            $lte: Number.parseInt(makeYearTo, 10),
          },
        });
      }
    } else {
      const { operator, value } = separateValueAndOperator(makeYearFrom);
      queryArray.push({
        launch_year: {
          [operator]: Number.parseInt(value, 10),
        },
      });
    }
  }

  if (releaseStatus && RELEASE_STATUS.includes(releaseStatus.toLowerCase())) {
    queryArray.push({
      is_upcoming: releaseStatus.toLowerCase() === 'upcoming',
    });
  } else if (releaseStatus) {
    throw new ApiError('Unknown releaseStatus. Release', 400);
  }
  queryArray.push({ is_active: true });
  dbQuery = queryArray.length > 0 ? { $and: queryArray } : {};
  // console.log('service dbq', dbQuery);
  let res = null;
  const sortBy = { [sortKey || 'launch_year']: sortOrderInt, _id: -1 };

  if (count) {
    const { total } = await getDataCount(modelInstance, dbQuery);
    // const resultArray = await cursor.toArray();
    res = {
      total,
    };
    return res;
  }
  const { total, cursor } = await getDataForAdvanceSearch(
    modelInstance,
    dbQuery,
    sortBy,
    pageNoInt * fetchSizeInt,
    fetchSizeInt
  );
  // const resultArray = await cursor.toArray();
  // console.log('total', total, 'cursor', cursor);
  res = {
    total,
    results: cursor.map((doc) => carsListParser(doc)),
  };
  return res;
};
