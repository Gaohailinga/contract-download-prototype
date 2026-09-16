/* 评审标注版交互逻辑（移动端 / PC 端共用） */
function $(id) { return document.getElementById(id); }

let toastTimer = null;
function showToast(msg, ms = 2400) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach((el) => el.classList.add('hidden'));
  const target = $(id);
  if (target) target.classList.remove('hidden');
}

/* 读取演示面板选择的上游响应 */
function currentResp() {
  const el = document.querySelector('input[name="resp"]:checked');
  return el ? el.value : 'success';
}

/* 下载合同：点击 → 获取下载地址（模拟）→ 按上游响应给出结果 */
function bindDownload() {
  const btn = $('btn-download');
  if (!btn) return;
  const original = btn.textContent;
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    btn.disabled = true;
    btn.textContent = '正在获取下载地址…';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      const resp = currentResp();
      if (resp === 'success') {
        showToast('已开始下载：2 份合同已打包为 1 个 zip');
      } else if (resp === 'fail') {
        showToast('下载失败，请稍后重试');
      } else {
        showToast('链接已失效，请重新获取');
      }
    }, 1200);
  });
}

function bindNav() {
  const entry = $('home-contract');
  if (entry) {
    entry.addEventListener('click', () => showScreen('screen-result'));
  }
}

bindDownload();
bindNav();
