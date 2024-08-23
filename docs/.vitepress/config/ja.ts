import { defineConfig } from 'vitepress'

const langName = '/ja';

export const ja = defineConfig({
  lang: 'ja-JP',
  description: "UnityやBlenderなどの情報のまとめページです。",
  themeConfig: {
    logo: '/images/logo.svg',
    nav: [
      { text: 'ホーム', link: langName + '/' },
      { text: '共通', link: langName + '/common/', activeMatch: '/common/' },
      { text: 'アバター', link: langName + '/avatar/', activeMatch: '/avatar/' },
      { text: 'ワールド', link: langName + '/world/', activeMatch: '/world/' }
    ],
    sidebar: [
      {
        text: '共通',
        link: langName + '/common/',
        collapsed: false,
        items: [
          { text: '【脱unitypackage】ツールのインポートにVPMを使ってみよう', link: langName + '/common/installwithvpm' }
        ]
      },
      {
        text: 'アバター',
        link: langName + '/avatar/',
        collapsed: false,
        items: [
          { text: 'VRChatアバター最適化・軽量化【脱Very Poor】', link: langName + '/avatar/optimization' }
        ]
      },
      {
        text: 'ワールド',
        link: langName + '/world/',
        collapsed: false
      },
      {
        text: 'ページの編集・追加について',
        link: langName + '/publish',
        collapsed: false
      }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          ja: {
            translations: {
              button: {
                buttonText: '検索',
                buttonAriaLabel: '検索'
              },
              modal: {
                noResultsText: '見つかりませんでした。',
                resetButtonTitle: '検索条件を削除',
                footer: {
                  selectText: '選択',
                  navigateText: '切り替え'
                }
              }
            }
          }
        }
      }
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
