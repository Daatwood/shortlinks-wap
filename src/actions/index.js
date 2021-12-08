import adapter, { api, host } from '../utils/adapter'

export const shortenUrl = async (url, onSuccess, onError) => {
  const res = await adapter().post(api+'/links/'+url,{}).catch(onError);
  res && res.status === 200 ? onSuccess(host+res.data.shortcode) : onError(res);
};

export const viewUrl = async  (url, onSuccess, onError) => {
  const res = await adapter().get(api+'/v/'+url).catch(onError);
  res && res.status === 200 ? onSuccess(res.data.Item) : onError(res);
}