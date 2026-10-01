window.__pipeAudit = async function () {
  const masks = await (await fetch("/_pipe_masks.json")).json();
  const header = document.querySelector(".site-header").getBoundingClientRect();
  const footer = document.querySelector(".site-footer").getBoundingClientRect();
  const vw = innerWidth;
  const range = document.createRange();
  const textBoxes = [];
  const roots = [...document.querySelectorAll("main h1, main h2, main h3, main p, main li, main a, main button, main label, main td, main th")];
  for (const el of roots) {
    if (el.closest("[class*='-pipes']")) continue;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue;
      range.selectNodeContents(node);
      for (const box of range.getClientRects()) {
        if (box.width > 4 && box.height > 4) {
          textBoxes.push({
            left: box.left,
            right: box.right,
            top: box.top,
            bottom: box.bottom,
            label: node.textContent.replace(/\s+/g, " ").trim().slice(0, 42),
          });
        }
      }
    }
  }

  const pipes = [...document.querySelectorAll("img[class*='-pipe-']")];
  const reports = pipes.map((img) => {
    const name = img.getAttribute("src").split("/").pop();
    const mask = masks[name];
    const r = img.getBoundingClientRect();
    const t = getComputedStyle(img).transform;
    const m = t.startsWith("matrix(") ? t.slice(7, -1).split(",").map(Number) : [1, 0, 0, 1, 0, 0];
    const flipX = m[0] < 0;
    const flipY = m[3] < 0;
    const cells = [];
    for (let gy = 0; gy < mask.rows; gy++) {
      for (let gx = 0; gx < mask.cols; gx++) {
        if (!mask.grid[gy][gx]) continue;
        let nx = (gx + 0.5) / mask.cols;
        let ny = (gy + 0.5) / mask.rows;
        if (flipX) nx = 1 - nx;
        if (flipY) ny = 1 - ny;
        cells.push({ x: r.left + nx * r.width, y: r.top + ny * r.height });
      }
    }
    const onPage = cells.filter((c) => c.x >= 0 && c.x <= vw);
    const textHits = [];
    for (const b of textBoxes) {
      if (onPage.some((c) => c.x >= b.left + 1 && c.x <= b.right - 1 && c.y >= b.top + 1 && c.y <= b.bottom - 1)) {
        textHits.push(b.label);
      }
    }
    const xs = onPage.map((c) => c.x);
    const ys = onPage.map((c) => c.y);
    return {
      cls: img.className.split(" ").pop(),
      name,
      flipX,
      w: Math.round(r.width),
      vis: onPage.length,
      total: cells.length,
      x: xs.length ? [Math.round(Math.min(...xs)), Math.round(Math.max(...xs))] : null,
      y: ys.length ? [Math.round(Math.min(...ys)), Math.round(Math.max(...ys))] : null,
      header: onPage.filter((c) => c.y < header.bottom).length,
      footer: onPage.filter((c) => c.y > footer.top && c.y < footer.bottom).length,
      text: [...new Set(textHits)].slice(0, 5),
    };
  });
  const textLeft = textBoxes.length ? Math.round(Math.min(...textBoxes.map((b) => b.left))) : null;
  const textRight = textBoxes.length ? Math.round(Math.max(...textBoxes.map((b) => b.right))) : null;
  return {
    vw,
    headerBottom: Math.round(header.bottom),
    footerTop: Math.round(footer.top),
    textLeft,
    textRight,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    reports,
  };
};
