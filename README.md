# 知识库 · HTML 阅读器

把 HTML 知识页整理成一个可以按卷阅读、全文检索的书架。站点是纯静态的，部署在 Cloudflare Workers 上，适配电脑和手机。

当前收录：

- **电机知识库**（`Motor-One/`）：7 卷 + 总览
- **HQ-One**（`HQ-One/`）：内容筹备中

## 本地运行

需要 Node.js 22.12 或更新版本（Cloudflare Workers Builds 的默认 Node 24 满足要求）。

```powershell
npm install
npm run dev
```

打开 `http://localhost:4173`。改动 `site/`、`kbs.json` 或知识库目录后，本地服务会自动重新构建，刷新浏览器即可。

只想生成静态文件：

```powershell
npm run build
```

构建结果在 `dist/`，它同时包含阅读器界面、知识库 HTML 和生成的搜索索引。

## 目录结构

```text
.
├─ site/                 阅读器界面（HTML / CSS / JS / 图标）
│  ├─ index.html
│  ├─ 404.html
│  └─ assets/
├─ scripts/
│  ├─ build.mjs          扫描知识库、生成清单与全文索引、输出 dist/
│  └─ serve.mjs          本地预览 + 自动重建
├─ Motor-One/            知识库一：HTML 页面 + src/ 源稿
├─ HQ-One/               知识库二：目前只有说明文件
├─ kbs.json              知识库清单（标题、简介、顺序、状态）
├─ wrangler.jsonc        Cloudflare Workers 静态资源配置
└─ dist/                 构建产物（不提交到 Git）
```

`kbs.json` 顶部的 `site.title`、`site.description`、`site.repo` 分别控制站点名称、简介和 GitHub 链接。

## 添加一个知识库

1. 在仓库根目录新建一个文件夹，例如 `NEW-One/`，把生成的 HTML 页面放进去。建议：

   - 有一个 `index.html` 作为总览；
   - 其他页面用 `01-`、`02-` 这样的数字前缀排序；
   - 页面里的相对链接可以互相跳转，阅读器会接管这些链接；
   - 图片等资源放在页面旁边或子目录里，构建时会一起复制。

2. 在 `kbs.json` 的 `kbs` 数组里加一项：

   ```json
   {
     "slug": "new-one",
     "source": "NEW-One",
     "title": "新知识库",
     "subtitle": "一句话说明",
     "description": "显示在书架卡片上的简介。",
     "tags": ["标签一", "标签二"],
     "unit": "篇",
     "accent": "#3f6675",
     "order": 3
   }
   ```

   - `slug` 只能使用小写字母、数字和连字符，它会出现在网址里。
   - `unit` 是“卷 / 篇 / 章”这类量词，只影响界面文案。
   - `accent` 是卡片左侧标记和链接强调色。
   - `order` 决定书架里的顺序。

3. 运行 `npm run dev` 或 `npm run build` 检查。提交并推送后，Cloudflare 会重新构建。

### 筹备中的知识库

在 `kbs.json` 里加 `"status": "planned"`，书架会显示一张“筹备中”卡片。等页面准备好后删掉这一行即可。

### 页面标题和排序

- 页面标题优先取页面里的 `<h1>`，其次是 `<title>`。
- 文件名以数字开头时，数字会作为卷号/篇号显示。
- `index.html` 会显示为“总览”。
- 侧边栏的短标题取 `<h1>` 里 `·` 之后的部分。例如 `第 3 卷 · 异步机与功率电子` 会显示为“异步机与功率电子”。

## 部署到 Cloudflare

推荐用 Workers Builds 连接 GitHub 仓库，之后每次推送都会自动构建发布。

1. 把仓库推到 GitHub：

   ```powershell
   git add .
   git commit -m "Build HTML knowledge base reader"
   git push -u origin main
   ```

2. 打开 Cloudflare 控制台的 **Workers & Pages**，选择 **Create application** → **GitHub**，选中 `purecores/html-cloudflare`。

3. 构建配置：

   - **Build command**：`npm ci --include=dev && npm run build`
   - **Deploy command**：`npx wrangler deploy`
   - **Root directory**：`/`（默认）
   - Worker 名称必须和 `wrangler.jsonc` 里的 `name` 一致：`html-cloudflare`

4. 首次部署完成后，到该 Worker 的 **Settings → Domains & Routes → Add → Custom domain**，填入你托管在 Cloudflare 的域名或子域名（例如 `kb.example.com`）。Cloudflare 会自动创建 DNS 记录和证书。

也可以在本机直接部署：

```powershell
npx wrangler login
npm run deploy
```

## 实现说明

- **阅读器外壳**：书架、目录、搜索、深色模式和字号设置由 `site/` 提供；每篇知识页放在同源的 `iframe` 里，所以原页面的排版、MathML、表格和打印样式都保持不变。
- **全文索引**：`scripts/build.mjs` 在构建时解析每页的 `section.am-panel`，把章节标题和正文写入 `dist/data/search-*.json`。搜索只读取本地 JSON，不依赖外部服务。
- **深色模式**：外壳和正文同步切换。知识页原有的主题选择器在发布版里被隐藏，由阅读器的“阅读设置”统一控制明暗和字号。
- **链接**：知识页之间的相对链接会被阅读器接管，更新侧边栏和网址；外部链接在新标签页打开；没有随知识库发布的页面会提示“这一页没有随知识库一起发布”。
- **安全头**：`site/_headers` 设置 `X-Frame-Options: SAMEORIGIN` 等响应头；阅读器页面自身还有 CSP。知识页保留它们原有的 CSP。
- **源稿**：构建只发布 HTML 和旁边的静态资源，`src/` 目录和 Markdown 文件不会被复制到 `dist/`。

## 常用命令

```powershell
npm run dev      # 本地预览，修改后自动构建
npm run build    # 生成 dist/
npm run deploy   # 构建并部署到 Cloudflare
```

## 更新内容时

如果重新生成了某个知识页的 HTML，直接覆盖 `Motor-One/`（或其他知识库目录）里的同名文件，然后：

```powershell
npm run build
```

搜索索引会在构建时重新生成，不需要手动维护。
