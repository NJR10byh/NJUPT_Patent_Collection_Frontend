import { request } from '@/utils/request';
import type { formListResult } from '@/api/model/formModel';

const Api = {
  BaseList: '/getFormList',
};

export function getFormList() {
  return request.post<formListResult>({
    url: Api.BaseList,
  });
}
