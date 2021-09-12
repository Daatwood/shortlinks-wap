import highlightTarget from './highlight'

const clipboardCopy = (idTarget, callback) => {
  let successful = false;
  highlightTarget(idTarget);
  try {
    successful = document.execCommand('copy');
  } catch (err) {
    console.log(err);
  }
  callback(successful)
}
export default clipboardCopy;