vue3 + ts 开发的本地阅读器

[在线预览](https://txt.akexc.com)

### Features

- 导入小说(目前只支持 `txt` 格式)
- 小说信息(作者, 书名, 大小等)
- 章节列表
- 正文阅读(长屏阅读)

---

### Todo

- 目录栏显示章节总数

```ts
const chapterList: string[] = ref([])

const totalChapter = computed(() => {
  return chapterList.lenght
})
```

- 解析作者

```ts
const 作者正则 = /作者\W{2,7}/g
```

- 主题切换(暗黑/白昼)
- 解析特殊作品目录(金庸作品等)
- 侧边栏目录 UI(shuimoUI)
- 阅读历史
- 正文分片
- 章节与正文锚点联动
- 下拉懒加载正文
- web worker
- IndexDB

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
