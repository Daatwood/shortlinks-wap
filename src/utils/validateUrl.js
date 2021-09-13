import settings from '../data/settings.json';

const regex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,"gm")
const regexSelf = new RegExp(`${settings.domain}`, 'gi');

const validateUrl = (url) => {
  if (!url) return null;
  const match = url.match(regex);
  if (!match ) return null;
  const matchingUrl = match[0];
  return (regexSelf.test(matchingUrl) ? null : matchingUrl)
}
export default validateUrl;