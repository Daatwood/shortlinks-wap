import settings from '../data/settings.json';
export const base = 'https://'+settings.domain+"/";

const redirectTo = () => {
  const shortcode = window.location.pathname.replace('/','')
  if (shortcode) {
    console.log('shortcode found, redirecting to '+ shortcode)
    window.location.href = base + shortcode
  }
}
export default redirectTo