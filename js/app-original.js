/* 纯净版交互逻辑（移动端 / PC 端共用，无评审标注与演示面板） */
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

/* 下载合同：点击 → 向业务层请求下载地址 → 使用地址触发下载 */
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
      showToast('已开始下载：2 份合同已打包为 1 个 zip');
    }, 1200);
  });
}

function bindNav() {
  const back = $('btn-back');
  if (back) {
    back.addEventListener('click', () => {
      showScreen('screen-home');
      showToast('已返回首页');
    });
  }
  const entry = $('home-contract');
  if (entry) {
    entry.addEventListener('click', () => showScreen('screen-result'));
  }
}

bindDownload();
bindNav();
