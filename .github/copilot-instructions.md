## 快速说明 — 目标

此文件面向自动化 AI 编码代理，帮助它们在本仓库中快速变得高效。
下面包含通用探索步骤（当代码存在时适配执行），以及本仓库当前可发现的仓库快照与针对性指引，便于在未来补充具体项目细节时快速更新。

## 启动步骤（必做）
- 先检查仓库根目录是否包含 `README.md`、`package.json`、`pyproject.toml`、`setup.py`、`Dockerfile`、`Makefile`、`.github/workflows/` 等任一文件，依据存在的内容推断语言与构建流程。
- 如果 `README.md` 存在，优先从中提取“运行/测试/构建”命令；没有 README 时，搜索 `src/`、`app/`、`cmd/`、`tests/` 等目录以识别语言与入口点。

## 仓库快照（自动探测，2025-11-24）
- 当前仓库中可发现的文件：只有 `.github/copilot-instructions.md`（即本文件）。
- 未检测到 `README.md`、`package.json`、`pyproject.toml`、`requirements.txt`、`go.mod`、`Dockerfile`、`src/` 等常见项目入口文件或目录。

如果你看到不同的结果（例如其他分支或子目录包含源代码），请回复并指出路径，我们会把它们合并进本指南。

## 常见模式与约定（检查点）
- 如果看到 `package.json`：Node/TS 项目，首选命令 `npm install`、`npm test`、`npm run build`。查找 `scripts` 字段以获取项目自定义命令。
- 如果看到 `pyproject.toml` 或 `requirements.txt`：Python 项目，查找 `poetry` 或 `pytest` 配置，优先使用 `pip install -r requirements.txt` 或 `poetry install`，测试通常是 `pytest`。
- 如果看到 `go.mod`：Go 项目，常用 `go build`、`go test ./...`。
- 如果看到 `.github/workflows/`：读取 CI 文件以收集实际的构建/测试命令与矩阵信息。

## 针对本仓库的具体探测指令（PowerShell）
运行下面命令以快速列出常见的项目文件（在仓库根目录）：
```powershell
Get-ChildItem -Recurse -File -Force | Where-Object { $_.Name -in @('README.md','package.json','pyproject.toml','requirements.txt','go.mod','Dockerfile','Makefile','setup.py') } | Select-Object FullName
Get-ChildItem -Recurse -Directory -Force | Where-Object { $_.Name -in @('src','app','cmd','tests') } | Select-Object FullName
```

如果这些命令返回结果，请把关键文件路径贴回给我；我会把检测到的构建/测试命令和依赖管理步骤整合进本文件。

## 代码风格与提交约定
- 在未发现项目特定规则时，请保守地遵循常见格式化工具（Prettier/ESLint、Black/isort、gofmt）。
- 不要擅自重写大量代码或变更公共 API；先提出 PR 草案并在 PR 描述中列出修改意图。

## 自动化补全/修改策略（给 AI 代理的具体行为）
- 优先做小且可逆的更改（独立文件、文档、单个模块的 bugfix）。
- 修改前扫描仓库以定位单测；若存在测试，先添加/更新对应测试并使其通过。
- 如果遇到无法推断的构建命令或语言，打开交互式提示请求人类确认（例如：主语言、如何运行、关键环境变量）。

## 针对本仓库的补充行为指南
- 在没有发现构建/测试线索时，不要盲目创建大量代码：首先提交探索型 PR（文档/清单类更改），并在 PR 描述中列出需要人类确认的假设。
- 用例：如果检测到 `package.json`，优先运行 `npm ci`；若检测到 `pyproject.toml` 或 `requirements.txt`，优先生成 `requirements.txt` 安装建议并暂不运行安装，等待人类确认环境。
- 保持变更小而可回滚：一次只修改一个文件，并在 PR 中说明测试/运行步骤。

## 合并现有指令的建议
- 当本仓库以后添加 `.github/copilot-instructions.md` 或 `AGENT.md` 时：请把原内容归入“历史/来源”小节，保留任何明确的命令示例（例如：`npm run dev`、`pytest -q`）并把全局通用步骤（上面“启动步骤”）置于顶部。

## 示例（当代码存在时可替换）
- 若 `package.json` 含 `scripts.dev`，示例命令：`npm ci` 然后 `npm run dev`。
- 若存在 `Dockerfile`，优先参考其中的 `CMD`/`ENTRYPOINT` 来了解运行入口。

## 反馈请求
我已在仓库根路径创建/更新此文件。请告诉我：
- 仓库的主语言和首选构建/测试命令是什么？
- 是否有现成的 README 或 CI 配置我应合并进此文件？

收到反馈后我会把具体的命令、示例与项目特定约定合并进此文件。

---
如果你希望我继续：
- 我可以运行上面的 PowerShell 探测命令并把输出贴回给你（需要你的确认运行）。
- 我可以在检测到具体语言时，立刻生成一份带有示例 `README.md`、基本 `requirements.txt`/`package.json` 和运行命令的草稿 PR。

请告诉我下一步偏好。
