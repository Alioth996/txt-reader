vue3 + ts 开发的本地阅读器

[在线预览](https://txt.akexc.com)

### Features

- 导入小说(目前只支持 `txt` 格式)
- 小说信息(作者, 书名, 大小等)
- 章节列表
- 正文阅读(长屏阅读)

---

### Todo

- 侧边栏目录(shuimoUI)
- 阅读历史
- 章节与正文锚点联动
- 以列表形式渲染正文
- web worker
- IndexDB
- service worker

---

### Difficulties

- 小说分片(一本小说以 2M 的大小进行分片)
- 左右无感滑动切换
- 章节与正文同步

---

### Dev-Environment

```json

  "engines": {
    "node": ">= v16.15",
    "pnpm": ">= v7.12",
    "vite": ">= v3.0.0"
  }


```
