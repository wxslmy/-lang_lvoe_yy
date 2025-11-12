## 快速说明 — 目标

此文件面向自动化 AI 编码代理，帮助它们在本仓库中快速变得高效。
目前仓库没有可发现的 README 或项目文件（package.json/pyproject.toml 等），因此本文件优先提供通用、可操作的探索与合并指引，便于在未来补充具体项目细节时快速更新。

## 启动步骤（必做）
- 先检查仓库根目录是否包含 `README.md`、`package.json`、`pyproject.toml`、`setup.py`、`Dockerfile`、`Makefile`、`.github/workflows/` 等任一文件，依据存在的内容推断语言与构建流程。
- 如果 `README.md` 存在，优先从中提取“运行/测试/构建”命令；没有 README 时，搜索 `src/`、`app/`、`cmd/`、`tests/` 等目录以识别语言与入口点。

## 常见模式与约定（检查点）
- 如果看到 `package.json`：Node/TS 项目，首选命令 `npm install`、`npm test`、`npm run build`。查找 `scripts` 字段以获取项目自定义命令。
- 如果看到 `pyproject.toml` 或 `requirements.txt`：Python 项目，查找 `poetry` 或 `pytest` 配置，优先使用 `pip install -r requirements.txt` 或 `poetry install`，测试通常是 `pytest`。
- 如果看到 `go.mod`：Go 项目，常用 `go build`、`go test ./...`。
- 如果看到 `.github/workflows/`：读取 CI 文件以收集实际的构建/测试命令与矩阵信息。

## 代码风格与提交约定
- 在未发现项目特定规则时，请保守地遵循常见格式化工具（Prettier/ESLint、Black/isort、gofmt）。
- 不要擅自重写大量代码或变更公共 API；先提出 PR 草案并在 PR 描述中列出修改意图。

## 自动化补全/修改策略（给 AI 代理的具体行为）
- 优先做小且可逆的更改（独立文件、文档、单个模块的 bugfix）。
- 修改前扫描仓库以定位单测；若存在测试，先添加/更新对应测试并使其通过。
- 如果遇到无法推断的构建命令或语言，打开交互式提示请求人类确认（例如：主语言、如何运行、关键环境变量）。

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
