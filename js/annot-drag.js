/* 评审标注拖拽：支持拖动、位置持久化（localStorage）、双击复位 */
(function () {
  const KEY = 'annot-pos-contract-download-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { saved = {}; }
  function flush() { localStorage.setItem(KEY, JSON.stringify(saved)); }

  document.querySelectorAll('[data-annot-id]').forEach((node) => {
    const id = node.getAttribute('data-annot-id');
    if (saved[id]) {
      node.style.left = saved[id].left || '';
      node.style.top = saved[id].top || '';
      node.style.right = saved[id].right === undefined ? '' : saved[id].right;
    }

    let dragging = false, startX = 0, startY = 0, originX = 0, originY = 0;

    node.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      const host = node.offsetParent.getBoundingClientRect();
      const self = node.getBoundingClientRect();
      originX = self.left - host.left;
      originY = self.top - host.top;
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      node.classList.add('dragging');
      node.style.right = 'auto';
      node.style.left = originX + 'px';
      node.style.top = originY + 'px';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      node.style.left = (originX + e.clientX - startX) + 'px';
      node.style.top = (originY + e.clientY - startY) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      node.classList.remove('dragging');
      saved[id] = { left: node.style.left, top: node.style.top, right: 'auto' };
      flush();
    });

    node.addEventListener('dblclick', () => {
      node.style.left = '';
      node.style.top = '';
      node.style.right = '';
      delete saved[id];
      flush();
    });
  });

  const reset = document.getElementById('reset-annot');
  if (reset) {
    reset.addEventListener('click', () => {
      saved = {};
      flush();
      document.querySelectorAll('[data-annot-id]').forEach((n) => {
        n.style.left = '';
        n.style.top = '';
        n.style.right = '';
      });
    });
  }
})();
