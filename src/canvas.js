/* eslint-disable */
function Counter({ value = 0 }) {
  const c = useRef();

  useEffect(() => {
    /** @type {CanvasRenderingContext2D} ctx */
    const ctx = c.current.getContext("2d");
    const { width, height } = c.current;
    ctx.lineWidth = 16;
    ctx.strokeStyle = "yellowgreen";
    ctx.lineCap = "round";
    ctx.clearRect(0, 0, width, height);

    const begin = -Math.PI / 2; // 12h
    const end = begin + Math.PI * 2 * value;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 80, begin, end);
    ctx.stroke();

    const favicon = getFavicon();
    favicon.href = c.current.toDataURL("image/png");
  });

  return <canvas className="counter" width="200" height="200" ref={c} />;
}

/**
 * @returns {HTMLLinkElement}
 */
function getFavicon() {
  const existingFavicon = document.querySelector("#favicon");
  if (existingFavicon) {
    return existingFavicon;
  }

  const newFavicon = document.createElement("link");
  newFavicon.setAttribute("id", "favicon");
  newFavicon.setAttribute("rel", "icon");
  newFavicon.setAttribute("type", "image/png");
  newFavicon.setAttribute("sizes", "32x32");
  document.head.appendChild(newFavicon);

  return newFavicon;
}
