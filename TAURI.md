将 PWA 打包为桌面应用（Tauri） — 快速指南

前提：需要安装 Node.js、npm/yarn、Rust（包含 `cargo`）和 `@tauri-apps/cli`。

步骤（最小流程）：

1. 安装 Rust（如果尚未安装）：

```powershell
# Windows
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# 然后重启终端或按提示设置环境
```

2. 在项目中初始化一个前端构建（如果你使用现有静态文件，可直接使用）：

```powershell
# 例如使用 npm 创建一个最小包（可跳过如果你已经有 index.html）
npm init -y
npm i --save-dev vite
```

3. 安装 Tauri CLI（全局或在项目中）：

```powershell
npm install -D @tauri-apps/cli @tauri-apps/api
npx tauri init
```

4. 配置 `tauri.conf.json` 的 `build.distDir` 指向你的静态输出目录（例如 `.` 或 `dist`），并把 `devPath` 指向 `http://localhost:8000` 或本地构建地址。示例（简化）：

```json
{
  "build": { "distDir": ".", "devPath": "http://localhost:8000" }
}
```

5. 构建并打包：

```powershell
# 开发时 (在一个终端运行静态服务器)：
# python -m http.server 8000
npx tauri dev

# 打包发行版
npx tauri build
```

注意事项：
- Tauri 会把你的静态文件与 Rust 后端打包为原生应用。确保 `distDir` 指向最终静态文件目录。
- Windows 上需要安装 MSVC（Visual Studio Build Tools）以便编译 Rust 原生二进制。参考 Tauri 官方文档获取详细依赖。

更多信息与高级配置请参考：https://tauri.app
