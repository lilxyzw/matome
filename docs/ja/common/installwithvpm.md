# ツールのインポートにVPMを使ってみよう【脱unitypackage】

[[toc]]

## VPMって……？

VRChat公式が用意しているツールをお手軽インストールできる仕組みです。公式のVRCSDKだけではなく有志が作ったツールもお手軽インストールでき、この仕組みを使うとわざわざダウンロードページに行かなくてもボタン１つで簡単にアップデートができるようになります！

## VPMを使うには

有志が作った[ALCOM](https://vrc-get.anatawa12.com/alcom/)というソフトがあり、これを使えばVPMの仕組みを簡単に利用できるようになります！

## ALCOMのインストール

1. [公式ページ](https://vrc-get.anatawa12.com/alcom/)のダウンロードボタンからインストーラーをダウンロードしましょう。

2. インストーラーを起動しようとすると警告が表示されることがありますが、以下の画像の通りにクリックして起動しましょう。

![Windows Defenderの画面1](/images/ja/common/installwithvpm/wd1.png "Windows Defenderの画面1")

![Windows Defenderの画面2](/images/ja/common/installwithvpm/wd2.png "Windows Defenderの画面2")

3. インストーラーのNextボタンをクリックしてインストールを進めましょう。

![インストーラーの画面1](/images/ja/common/installwithvpm/install1.png "インストーラーの画面1")

![インストーラーの画面2](/images/ja/common/installwithvpm/install2.png "インストーラーの画面2")

![インストーラーの画面3](/images/ja/common/installwithvpm/install3.png "インストーラーの画面3")

![インストーラーの画面4](/images/ja/common/installwithvpm/install4.png "インストーラーの画面4")

4. これでインストールは完了です！ショートカットか検索バーからALCOMを起動してみましょう。

![Windowsの検索バー](/images/ja/common/installwithvpm/start.png "Windowsの検索バー")

5. 最後にVPMを使いやすくするために設定を開き、下の方にあるメニューからURLの紐付けをします！

![ALCOMの設定画面](/images/ja/common/installwithvpm/setting.png "ALCOMの設定画面")

## ALCOMにUnityプロジェクトを登録

::: info
もしすでにプロジェクトが表示されている場合はこの手順は不要です。
:::

ALCOMでツールを管理できるようにプロジェクトを登録してみましょう。`既存のプロジェクトを追加`ボタンをクリックすると選択画面が開きますが、プロジェクトの最上位のフォルダを選択してください。

```
プロジェクト名 ← このフォルダを選択
 ├ Assetsフォルダ
 ├ Libraryフォルダ
 ├ Logsフォルダ
 ├ Packagesフォルダ
 ├ ...
```

![ALCOMのプロジェクト追加画面](/images/ja/common/installwithvpm/addproject.png "ALCOMのプロジェクト追加画面")

## ツールの追加

`VPMリポジトリ`というツールの情報がまとまったデータをALCOMに追加してみましょう。インストールのときにURLの紐付けを行ったので以下のURLをクリックするだけで簡単にリポジトリを追加できます。

- [lilToonやlilycalInventoryなど](vcc://vpm/addRepo?url=https://lilxyzw.github.io/vpm-repos/vpm.json)
- [Modular Avatarなど](vcc://vpm/addRepo?url=https://vpm.nadena.dev/vpm.json)
- [Avatar Optimizerなど](vcc://vpm/addRepo?url=https%3A%2F%2Fvpm.anatawa12.com%2Fvpm.json)

![ALCOMのプロジェクト管理画面](/images/ja/common/installwithvpm/manageproject.png "ALCOMのプロジェクト管理画面")

![ALCOMのパッケージ追加画面](/images/ja/common/installwithvpm/package.png "ALCOMのパッケージ追加画面")