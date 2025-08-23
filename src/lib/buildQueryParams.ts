import { ColumnFiltersState } from '@tanstack/react-table';

export const buildQueryParams = (filters: ColumnFiltersState): string =>
  new URLSearchParams(
    filters.flatMap(({ id, value }) =>
      Array.isArray(value) && value.length === 2
        ? [
            ...(value[0] != null && value[0] !== ''
              ? [[`${id}[gte]`, String(value[0])]]
              : []),
            ...(value[1] != null && value[1] !== ''
              ? [[`${id}[lte]`, String(value[1])]]
              : []),
          ]
        : typeof value === 'object' && value !== null
        ? Object.entries(value).flatMap(([op, val]) =>
            [
              'eq',
              'ne',
              'gt',
              'gte',
              'lt',
              'lte',
              'in',
              'nin',
              'regex',
              'exists',
              'all',
              'size',
              'elemMatch',
              'type',
              'mod',
              'not',
              'and',
              'or',
              'nor',
              'text',
              'where',
              'geoWithin',
              'geoIntersects',
              'near',
              'nearSphere',
              'expr',
              'jsonSchema',
              'bitsAllClear',
              'bitsAllSet',
              'bitsAnyClear',
              'bitsAnySet',
              'rand',
            ].includes(op) &&
            val != null &&
            val !== ''
              ? [[`${id}[${op}]`, String(val)]]
              : [],
          )
        : value != null && value !== ''
        ? [[id, String(value)]]
        : [],
    ),
  ).toString();

// const queryParams = new URLSearchParams(
//   columnFilters.flatMap(({ id, value }) => {
//     if (Array.isArray(value) && value.length === 2) {
//       return [
//         [`${id}[gte]`, value[0]],
//         [`${id}[lte]`, value[1]],
//       ];
//     }
//     return [[id, value]];
//   })
// ).toString();
