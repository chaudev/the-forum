import {instance} from '../instance';

const url: string = '/api/isstore';
const storeApi = {
  getIsStore() {
    return instance.get<IApiResult>(url);
  },
};

export {storeApi};
