const highlightTarget = (idTarget, callback) => {
  const target = document.querySelector(idTarget);
  target.focus();
  target.select();
  if (callback) callback();
}
export default highlightTarget;