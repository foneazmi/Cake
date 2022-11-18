const PB_BASE_URL = 'https://pb.khan.my.id';
import qs from 'qs';

const getList = async (collection, params) => {
  let query = qs.stringify(params);
  return fetch(
    `${PB_BASE_URL}/api/collections/${collection}/records?${query}`,
    {
      method: 'GET',
    },
  ).then(async response => await response.json());
};

const create = async (collection, payload, params) => {
  let query = qs.stringify(params);
  return fetch(
    `${PB_BASE_URL}/api/collections/${collection}/records?${query}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  ).then(async response => await response.json());
};

const update = async (collection, id, payload, params) => {
  let query = qs.stringify(params);
  return fetch(
    `${PB_BASE_URL}/api/collections/${collection}/records/${id}?${query}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  ).then(async response => await response.json());
};

export const pb = {
  getList,
  create,
  update,
};
