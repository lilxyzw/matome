# ページの編集・追加について

基本的にはGitHubの[Pull Request](https://github.com/coreybutler/nvm-windows/pulls)で書いたマークダウンを投げるだけですが、実際の環境でどのように表示されるのかを確認したい場合のために執筆環境の構築方法を記載します。

[[toc]]

## 環境構築手順（Windows）

1. [matome](https://github.com/lilxyzw/matome)をclone

2. [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)をインストール（既にnvm環境がある場合はそれでも可）

3. コマンドプロンプトを開き`cd [ディレクトリ]`コマンドで手順1でcloneしたディレクトリに移動
   ```
   matome ← このフォルダ
    ├ .github
    ├ docs
    ├ .gitattributes
    ├ .gitignore
    ├ LICENSE
    ├ package-lock.json
    ├ package.json
   ```

4. `npm ci`コマンドを実行（前提パッケージがインストールされます）

5. `npm run docs:dev`コマンドを実行（ページのプレビューが開始されます）

6. ブラウザで`http://localhost:5173/matome/`を開きプレビュー

## 既存のページの編集

ページの編集については`docs/ja/...`フォルダのマークダウンを編集し、該当ページをブラウザで確認するだけです。

## 新規ページの作成

ページを作成する場合はマークダウンの作成に加え、サイトマップにリンクを追加する必要があります。

1. `docs/ja/...`フォルダに移動し中にマークダウンを作成

2. 同一階層の`index.md`に作ったページへのリンクを追加

3. `docs/.vitepress/config/ja.ts`に作ったページへのリンクを追加

4. ブラウザで確認

## 画像や動画の追加について

画像や動画は`docs/public/images/ja/...`にマークダウンファイルと同じ名前のフォルダを作成しその中に配置してください。例えば`docs/public/images/ja/common/xxx/yyy.png`はマークダウンに`![画像](/images/ja/common/xxx/yyy.png "画像")`と書くことで参照できます。動画の場合、`<video controls="controls" src="/images/ja/common/xxx/yyy.webm" />`のように参照できます。

## 最終確認

Pull Requestを投げる前に実際にページをビルドして確認します。

1. コマンドプロンプトで`ctrl + C`でプレビューを停止

2. `npm run docs:build`コマンドを実行（ビルドが行われ、問題があればどこにエラーがあるかが表示されます）

3. `npm run docs:preview`コマンドを実行（ビルドしたもののプレビューが開始されます）

4. ブラウザで`http://localhost:4173/matome/`を開き最終確認

5. 問題なければGitHubでPull Requestを投げる