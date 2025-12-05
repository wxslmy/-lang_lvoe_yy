# 最小 PWA 示例

这是一个极简的 PWA 演示，包含离线缓存与基本更新控制。文件位于仓库根：

- `index.html` - 应用入口
- `app.js` - 在客户端注册 service worker 并提供手动更新按钮
- `sw.js` - 简单的缓存策略（安装缓存、缓存优先、网络回退）
- `manifest.json` - Web App Manifest（内联 SVG 图标）
- `styles.css` - 最小样式

本示例旨在用最少代码直接可作为 PWA 体验。

快速运行（在 PowerShell）：
```powershell
# 使用 Python 的简单静态服务器（需要 Python 已安装）
python -m http.server 8000; Start-Process "http://localhost:8000"

# 或者使用 npm 的 serve（如已安装）
# npx serve . -l 8000
```

测试要点：
- 在浏览器打开 `http://localhost:8000`，确认页面显示并且 `Service Worker` 已注册。
- 关闭网络/断网后刷新页面，页面应仍可加载（由缓存提供）。
- 修改 `sw.js` 的 `CACHE_NAME`（例如改为 `minimal-pwa-v2`）并刷新页面以测试更新流程；点击“手动更新缓存”可以触发等待中的激活。

如需我为此添加更完善的离线页面、图标文件或自动部署脚本，请告诉我具体需求。
