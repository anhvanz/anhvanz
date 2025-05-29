export const SITE_CONFIG = {
  url: 'anhvanz.vercel.app',
  githubRepo: 'https://github.com/anhvanz/anhvanz',
  githubBranch: 'main', // Hoặc 'dev', 'next' tùy bạn
  postDir: 'content/posts',
  tutorialDir: 'content/tutorials',
}

export const GISCUS = {
  termPrefix: "dangth",
  id: "comments",
  repo: "dangth12/blog-giscus-comments" as `${string}/${string}`,
  repoId: "R_kgDOJpeyjQ",
  category: "Announcements",
  categoryId: "DIC_kwDOJpeyjc4CW2KO",
  mapping: 'pathname' as const,
  light: "light",
  dark: "transparent_dark"
}

export const GITHUB = {
  username: "anhvanz",
  topic: "featured"
}
