import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Explorer 공통 설정
const explorerOptions = {
  title: "탐색기",
  folderDefaultState: "open" as const,
  sortFn: (a: any, b: any) => {
    if (!a.file && b.file) return -1
    if (a.file && !b.file) return 1
    if (!a.file && !b.file) {
      return a.displayName.localeCompare(b.displayName, "ko")
    }
    const aDate = a.file?.dates?.modified ?? a.file?.dates?.created ?? new Date(0)
    const bDate = b.file?.dates?.modified ?? b.file?.dates?.created ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  },
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "스마트스토어": "https://smartstore.naver.com/elsom",
      "공식 쇼핑몰": "https://elsom.shop",
      "이메일": "mailto://office@elsom.co.kr",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(explorerOptions),  // 여기 수정
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(explorerOptions),  // 여기도 수정
  ],
  right: [],
}
