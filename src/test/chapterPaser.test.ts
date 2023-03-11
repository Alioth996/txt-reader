import { test, expect } from 'vitest'

import { chaptersPaser, getZJ } from '@/utils/book'

test('章节提取测试', () => {
  expect(
    chaptersPaser(`
     一 你是真的皮

  `).then(res => res)
  ).toMatchInlineSnapshot('undefined')
})
