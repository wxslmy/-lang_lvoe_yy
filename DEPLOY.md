Traefik 本地部署与 Tauri 打包快速说明

Traefik 本地示例：

- 已包含文件：`docker-compose.yml`（Traefik + site），`traefik/dynamic.yml`。
- 启动：在仓库根运行 `docker-compose up -d`，Traefik 会把 `Host(`localhost`)` 路由到 `site`（nginx，挂载项目根为静态内容）。
- 注意：该示例使用 Traefik 的 file provider（动态配置文件 `traefik/dynamic.yml`），适合本地测试；生产环境建议改用 docker provider、TLS、Let’s Encrypt 或 Traefik 中心化管理。

调试与常见问题：
- 若浏览器无法访问 `http://localhost`：确认 Docker 正在运行并且端口 80 未被本机其它服务占用。
- 若需要 HTTPS：在 Traefik 中启用 ACME（Let’s Encrypt），或在本地使用自签证书并配置 Traefik TLS 配置。

Tauri 打包：请参考仓库中的 `TAURI.md`，其中包含最小依赖与打包流程。主要点：

- 需要 Rust（MSVC toolchain 在 Windows 上）和 Node.js；  
- 将 `tauri.conf.json` 的 `build.distDir` 指向本项目静态文件目录；  
- 使用 `npx tauri dev` 开发，`npx tauri build` 打包。

下一步建议（我可以代做的）：
- 为 Traefik 添加 HTTPS（Let’s Encrypt）示例配置并演示自动证书申请（需要公开域名）。
- 为项目添加 `dockerignore`、优化 nginx 配置或把静态文件放在单独 `site/` 子目录以便更清晰的挂载。
