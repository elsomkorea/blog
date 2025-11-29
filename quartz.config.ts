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
    baseUrl: "blog.elsom.co.kr",
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
          // 배경 계열 - Pantone Gardenia (13-1404)에서 영감
          light: "#FAF7F5",           // 크림빛 오프화이트 (눈 피로도 낮음)
          lightgray: "#E8E4E1",       // 테두리, 구분선

          // 텍스트 계열
          gray: "#8E8C89",            // Pantone Aluminum 느낌, 보조 텍스트
          darkgray: "#5C5A57",        // 부제목, 메타 정보
          dark: "#2D2926",            // Pantone Black Coffee, 본문 텍스트

          // 액센트 계열 - Pantone Peach Fuzz (2024 올해의 색) + Classic Blue 조합
          secondary: "#0F4C81",       // Pantone Classic Blue 유지 (신뢰감)
          tertiary: "#FFBE98",        // Pantone Peach Fuzz, 호버시 따뜻한 느낌
          highlight: "rgba(255, 190, 152, 0.12)",  // Peach Fuzz 배경
          textHighlight: "#F5DF4D66", // Illuminating 투명도 낮춤 (덜 튀게)
        },
        darkMode: {
          // 배경 계열 - 깊이감 있는 다크
          light: "#1A1918",           // 순수 검정보다 따뜻한 느낌
          lightgray: "#2E2C2A",       // 카드, 구분선

          // 텍스트 계열
          gray: "#9C9A97",            // 보조 텍스트
          darkgray: "#D1CFCC",        // 부제목
          dark: "#F5F3F0",            // 본문 (순백보다 부드러움)

          // 액센트 계열
          secondary: "#89B4FA",       // 라이트 블루 (눈 편함)
          tertiary: "#FFCAA8",        // Peach Fuzz 밝은 버전
          highlight: "rgba(137, 180, 250, 0.12)",
          textHighlight: "#FFBE9833", // 다크모드용 하이라이트
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
