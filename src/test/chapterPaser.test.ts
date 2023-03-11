import { test, expect } from 'vitest'

import { chaptersPaser, getZJ } from '@/utils/book'

test('章节提取测试', () => {
  expect(
    chaptersPaser(
      `
  dallak
  尽快落地阿三是
  大家来看    


    一百零五十九章 江州司马青山寺
    这是我的测试文件

// 常规的写法，我们需要这样
test('hello vitest', () => {
expect(genNumber(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
复制代码
但是如果我们只是想看看这个函数运行之后的效果呢？有意思的地方来了，如果我们使用 toMatchInlineSnapshot，在开启观察模式的情况下， Vitest 将会自动更新快照。如果我们想更新快照，可以在观察模式下直接敲击 u 来更新快照。非观察模式下可以通过 vitest -u 可以批量更新快照

二 你是真的皮
2的健康地理空间
  `
    ).then(res => console.log(res))
  ).toMatchInlineSnapshot('Promise {}')
})
