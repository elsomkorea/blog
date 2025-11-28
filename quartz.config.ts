import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ELSOM's 스토리",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ko-KR",
    baseUrl: "elsomkorea.github.io/blog",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans KR",
        body: "Noto Sans KR",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",      // 배경: 눈이 편안한 오프화이트
          lightgray: "#e5e5e5",  // 테두리
          gray: "#939597",       // [Pantone Ultimate Gray] 보조 텍스트
          darkgray: "#4e4e4e",   // 본문보다 연한 텍스트
          dark: "#2b2b2b",       // 본문: 가독성 좋은 진한 회색
          secondary: "#0f4c81",  // [Pantone Classic Blue] 링크, 제목 (핵심!)
          tertiary: "#537895",   // 링크 호버 색상
          highlight: "rgba(15, 76, 129, 0.15)", // 링크 배경
          textHighlight: "#F5DF4D88", // [Pantone Illuminating] 형광펜 효과
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#939597",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7aa2f7",  // 다크모드용 밝은 파랑
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
