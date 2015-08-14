var iframeText;
export default function measureText(text, width) {
  iframeText = iframeText || document.createElement('iframe');
  document.body.appendChild(iframeText);

  var body = iframeText.contentDocument.body;
  if (width === undefined || width !== width) {
    width = Infinity;
  }

  var div = document.createElement('div');
  div.style.width = (width === Infinity ? 10000000 : width) + 'px';
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.alignItems = 'flex-start';
  div.style.alignContent = 'flex-start';

  var span = document.createElement('span');
  span.style.display = 'flex';
  span.style.flexDirection = 'column';
  span.style.alignItems = 'flex-start';
  span.style.alignContent = 'flex-start';
  span.innerText = text;

  div.appendChild(span);
  body.appendChild(div);
  var rect = span.getBoundingClientRect();
  body.removeChild(div);
  return {
    width: rect.width,
    height: rect.height
  };
}
