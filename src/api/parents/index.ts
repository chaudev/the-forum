import {instance} from '../instance';

const url: string = '/api/phhs';
const parentsApi = {
  getNewsFeed(params: any) {
    return instance.get<IApiResult<INewsFeed[]>>(url + `/newsfeed`, {
      params,
    });
  },
  getCourse() {
    return instance.get<IApiResult<ICourse[]>>(url + `/listcourse`);
  },
  getCourseSchedule(data: any) {
    return instance.get<IApiResult<ISchedule>>(url + `/courseschedule/${data}`);
  },
  getPaymentHistory() {
    return instance.get<IApiResult<IPaieds[]>>(url + `/paymenthistory`);
  },
  getCourseJoined() {
    return instance.get<IApiResult<IPaieds[]>>(url + `/coursejoined`);
  },
  getResultTest() {
    return instance.get<IApiResult<IPaieds[]>>(url + `/resulttest`);
  },
  getMore() {
    return instance.get<IApiResult<IPaieds[]>>(url + `/other`);
  },
};

export {parentsApi};
