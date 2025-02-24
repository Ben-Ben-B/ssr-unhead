import { Controller, Get, Provide, Inject } from '@midwayjs/decorator'
import { Context } from '@midwayjs/koa'
import { render } from 'ssr-core'
import { IApiService, IApiDetailService } from '../interface'
import { renderSSRHead } from '@unhead/ssr'
import { Readable } from 'stream'

interface IKoaContext extends Context {
  apiService: IApiService
  apiDeatilservice: IApiDetailService
}

@Provide()
@Controller('/')
export class Index {
  @Inject()
  ctx: IKoaContext

  @Inject('ApiService')
  apiService: IApiService

  @Inject('ApiDetailService')
  apiDeatilservice: IApiDetailService

  @Get('/')
  @Get('/detail/:id')
  async handler (): Promise<void> {
    // 渲染降级参考文档 http://doc.ssr-fc.com/docs/features$csr#%E5%A4%84%E7%90%86%20%E6%B5%81%20%E8%BF%94%E5%9B%9E%E5%BD%A2%E5%BC%8F%E7%9A%84%E9%99%8D%E7%BA%A7
    const { ctx } = this
    try {
      ctx.apiService = this.apiService
      ctx.apiDeatilservice = this.apiDeatilservice

      let htmlStr = await render(this.ctx, {
        stream: false
      })
      const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ctx.head)
      htmlStr = htmlStr.replace('</head>', `${headTags}</head>`).replace('</body>', `${bodyTags}</body>`).replace('<body>', `<body ${bodyAttrs}>${bodyTagsOpen}`).replace('<html>', `<html ${htmlAttrs}>`)
      ctx.body = Readable.from(htmlStr)
    } catch (error) {
      console.log('ssr error', error)
      const stream = await render(ctx, {
        stream: true,
        mode: 'csr'
      })
      ctx.body = stream
    }
  }
}
