import adapter, { base } from '../utils/adapter'

export const shortenUrl = async (url, onSuccess, onError) => {
  const res = await adapter().post(base+'/links/'+url,{}).catch(onError);
  res && res.status === 200 ? onSuccess(base+res.data.shortcode) : onError(res);
};

export const viewUrl = async  (url, onSuccess, onError) => {
  const res = await adapter().get(base+'/v/'+url).catch(onError);
  res && res.status === 200 ? onSuccess(res) : onError(res);
}