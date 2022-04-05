import {instance} from '../instance';

const url: string = '/api/account';
const userApi = {
  login(data: IInputLogin) {
    const temp = new FormData();
    temp.append('username', data.username);
    temp.append('password', data.password);
    return instance.post<IApiResult<ILogin>>(url + '/login', temp);
  },
  saveIncludeplayer(data: any) {
    const temp = new FormData();
    temp.append('AccountID', data.AccountID);
    temp.append('IncludePlayerID', data.IncludePlayerID);
    return instance.post<IApiResult<ILogin>>(url + '/saveincludeplayerid', temp);
  },
  updateProfile(data: any) {
    return instance.put<IApiResult<IPpdateProfile>>(url + '/updateprofile', data);
  },
  updatePassword(data: any) {
    return instance.put<IApiResult<IPpdateProfile>>(url + '/updatepassword', data);
  },
  uploadAvatar(data: any) {
    let frmData = new FormData();
    frmData.append('file', {
      uri: data.uri,
      type: data.type,
      name: data.name,
    });
    return instance.post(url + '/uploadAvatar', frmData);
  },
  getNotification(params: any) {
    return instance.get<IApiResult<INotification>>(
      url + `/notification/0?start=${params.start}&lenght=${params.lenght}`,
    );
  },
  getTermOfService() {
    return instance.get<IApiResult<ITerm>>(url + `/termofservice`);
  },
  getFAQ() {
    return instance.get<IApiResult<ITerm>>(url + `/faq?start=1&lenght=10`);
  },
};

export {userApi};
