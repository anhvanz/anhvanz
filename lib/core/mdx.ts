import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkAdmonition from '../plugins/remarkAdmonition'
import { estimateReadingTime } from '@/utils/readingTime'
import 'katex/dist/katex.min.css'

export type MarkdownType = 'posts' | 'tutorials'

export interface MarkdownContent {
  slug: string
  title: string
  subtitle?: string
  author?: string
  date?: string
  image?: string | null
  tags?: string[]
  contentHtml: string
  readingTime: number
  lastUpdated: string
}

export async function getMarkdownContent(
  type: MarkdownType,
  slug: string
): Promise<MarkdownContent | null> {
  const baseDir = path.join(process.cwd(), 'content', type)
  const filePath = path.join(baseDir, `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkAdmonition)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processed.toString().replace(/<img([^>]+?)>/g, '<img class="zoom-img"$1>')
  const contentText = content.replace(/[#_*>\-\n`]/g, '')
  const readingTime = estimateReadingTime(contentText)
  const stat = fs.statSync(filePath)

  const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/)
  const firstImage = imgMatch ? imgMatch[1] : '@/public/images/avt.png'

  return {
    slug,
    title: data.title ?? '',
    subtitle: data.subtitle ?? '',
    author: data.author ?? '',
    date: typeof data.date === 'string' ? data.date : undefined,
    tags: data.tags ?? [],
    image: data.image ?? firstImage,
    contentHtml,
    readingTime,
    lastUpdated: stat.mtime.toISOString()
  }
}
