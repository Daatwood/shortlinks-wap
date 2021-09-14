import settings from '../data/settings.json';

const regexHtml = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,"gm")
const regexSelf = new RegExp(`${settings.domain}`, 'i');

const matchingUrl = (url, regex) => {
  if (!url) return null;
  const match = url.match(regex);
  return match ? match[0] : null;
}

const validateUrl = (url) => {
  return matchingUrl(url, regexHtml);
}
export default validateUrl;

export const shortcodeUrl = (url) => {
  let mUrl = matchingUrl(url, regexHtml);
  if (!regexSelf.test(mUrl)) return null;
  return mUrl.replace('https://','').split('/')[1];
}