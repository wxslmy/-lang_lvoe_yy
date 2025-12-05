// 最小 service worker 注册与缓存控制
const statusEl = document.getElementById('status');
const updateBtn = document.getElementById('update');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    statusEl.textContent = 'Service Worker: 已注册';
    // 当有新的 SW 等待时提示用户
    if (reg.waiting) {
      statusEl.textContent = 'Service Worker: 等待激活（有可用更新）';
    }
    reg.addEventListener('updatefound', () => {
      statusEl.textContent = 'Service Worker: 检测到更新';
    });
  }).catch(err => {
    statusEl.textContent = 'Service Worker: 注册失败';
    console.error('SW 注册失败:', err);
  });
} else {
  statusEl.textContent = 'Service Worker: 不受支持';
}

updateBtn.addEventListener('click', async () => {
  // 通过 postMessage 告知 SW 跳过等待并立即激活
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg && reg.waiting) {
    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    statusEl.textContent = '已请求激活更新';
  } else {
    statusEl.textContent = '没有等待中的更新；尝试触发更新';
    // 强制检查更新
    reg && reg.update();
  }
});
