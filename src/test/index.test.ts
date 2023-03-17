import { chaptersPaser, authorParser, getZJ } from '@/utils/book'
import { test, describe } from 'vitest'
import { hashBookName } from '@/utils/tools'
// 并发测试
describe.concurrent('书籍相关逻辑测试', () => {
  test('chapterPaser提取书籍章节列表', ({ expect }) => {
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
    ).toMatchInlineSnapshot()
  })

  test('哈希小说名', ({ expect }) => {
    expect(hashBookName('天龙八部')).toBe(719926381)
  })

  test('getZJ提取书籍章节列表', ({ expect }) => {
    expect(
      getZJ(
        `
        dallak
        尽快落地阿三是
        大家来看    
          第一百零五十九章 江州司马青山寺
          这是我的测试文件
      
      // 常规的写法，我们需要这样
      test('hello vitest', () => {
      expect(genNumber(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      })
      复制代码
      但是如果我们只是想看看这个函数运行之后的效果呢？有意思的地方来了，如果我们使用 toMatchInlineSnapshot，在开启观察模式的情况下， Vitest 将会自动更新快照。如果我们想更新快照，可以在观察模式下直接敲击 u 来更新快照。非观察模式下可以通过 vitest -u 可以批量更新快照
      
      第二章 你是真的皮
      第2节 的健康地理空间
          `
      )
    ).toMatchSnapshot()
  })

  test('提取书籍作者', ({ expect }) => {
    expect(
      authorParser(`
    　　书名:仙幻传说
　　作者:池边人


　　我欲闻道
　　第一章 卖茶少年

　　这是仙幻大陆西南的一个小城镇，人口大概五六千人，小镇名叫抚桐。
　　这时正值墟市，一向平静的小镇长街上倒是热闹非凡，人来人往。
　　街口的一角摆着一个小茶摊当，一名形容枯槁的妇人请在烧水煮茶，茶摊外摆着几张
    [作者]\W{2,7}
    `)
    ).match(/作者\W{2,7}/)
  })
})
