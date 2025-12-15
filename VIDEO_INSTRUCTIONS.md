如何录制演示为 MP4（Windows / PowerShell）

先决条件：
- 已安装 FFmpeg（可用 `ffmpeg -version` 验证）。如果未安装，可以在 Windows 上使用 `winget`：

```powershell
winget install --id=Gyan.FFmpeg -e --source winget
```

录制步骤（推荐分两步进行）：

1) 在仓库根启动一个本地静态服务器（若尚未运行）：

```powershell
py -3 -m http.server 8000
```

2) 在浏览器打开演示页面：

打开 `http://localhost:8000/demo-video.html` 并把浏览器窗口放置在屏幕中央、设置合适大小（例如 1280x720 以录制 720p 视频）。

3) 使用 FFmpeg 录制指定窗口（基于窗口标题或全屏）：

- 录制整个显示器（示例使用主显示器）：

```powershell
ffmpeg -f gdigrab -framerate 25 -i desktop -video_size 1280x720 -pix_fmt yuv420p -c:v libx264 -preset veryfast demo.mp4
```

- 或者按窗口标题录制（如果浏览器窗口标题包含页面标题，例如“演示录制 - 装修平台网 Demo”）：

```powershell
ffmpeg -f gdigrab -framerate 25 -i title="演示录制 - 装修平台网 Demo" -pix_fmt yuv420p -c:v libx264 -preset veryfast demo.mp4
```

常见参数说明：
- `-framerate 25`：帧率，可改为 30。  
- `-video_size 1280x720`：指定分辨率（仅在录制整个桌面时有效）。  
- `-c:v libx264 -preset veryfast`：使用 x264 编码器并用较快预设以减小 CPU 占用。

4) 完成录制后，按 `q` 或在 PowerShell 中用 Ctrl+C 停止 FFmpeg，输出文件 `demo.mp4` 将保存在当前目录。

5) （可选）把 MP4 转为 GIF：

```powershell
ffmpeg -i demo.mp4 -vf "fps=15,scale=640:-1:flags=lanczos" -loop 0 demo.gif
```

提示与调优：
- 若录制时画面抖动或卡顿，降低 `-framerate` 或改用 `-preset superfast`。  
- 若需要同时录制系统声音（不建议用于简单 UI 演示），可在 FFmpeg 中添加 audio 设备输入（Windows 配置较复杂）。

如果你希望我代为在当前环境执行录制（我可以在终端运行 FFmpeg），请确认：
- 本机已安装 FFmpeg/Python（我将使用 FFmpeg 录制桌面或指定窗口）。  
- 我可以访问并控制终端以启动/停止录制。
