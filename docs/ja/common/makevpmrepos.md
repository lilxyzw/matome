# 【開発者向け】自作物をVPM・VCC対応する方法

## 手順（Unity作業編）

1. ツールのフォルダをAssets配下ではなくPackages配下に置く

2. フォルダ名を適宜変更する（エラーが出ない限りは何でもいいですが`com.unity.burst`のようなネーミングがされることが多いので私もそれに合わせて`com.example.tool`としています）

3. ツールのルートフォルダ直下にpackage.jsonを作成

必要最低限の例
```json
{
  "name": "com.example.tool",
  "version": "1.0.0",
}
```

色々書いてみた例
```json
{
  "name": "com.example.tool",
  "displayName": "Example Tool",
  "version": "1.0.0",
  "author": {
    "name": "Example",
    "email": "contact@example.com"
  },
  "unity" : "2022.3",
  "description" : "Package for explanation.",
  "vpmDependencies" : {
    "com.vrchat.avatars" : "3.7.0"
  },
  "url" : "https://packages.example.com/com.example.tool-1.0.0.zip?",
  "legacyFolders" : {
    "Assets\\ExampleTool" : "5f241139b9f5c4fcf5076516cb09aecc"
  }
}
```

表は重要そうなところの抜粋です。公式の情報は以下から。
- [Unity - Manual: Package manifest](https://docs.unity3d.com/2022.3/Documentation/Manual/upm-manifestPkg.html)
- [Packages | VRChat Creator Companion](https://vcc.docs.vrchat.com/vpm/packages/)

|プロパティ|説明|
|-|-|
|name（必須）|パッケージ名。`com.example.tool`のようなフォーマットで設定。|
|version（必須）|ツールのバージョン番号。`0.0.0`のようなフォーマット（semver）で指定。semverにはバージョン番号の上げ方に制約があり、`x.y.z`のうち他のツールのコードに変更が必要なような破壊的な変更があればxを、単なる機能追加であればyを、不具合修正のみであればzの数値を上げるように決められている。|
|displayName（必須？）|ツールの表示上の名前。現状なくても動くが、あるとVCCやALCOMでこの名前が表示されてわかりやすいのであったほうが良い。|
|url（必須？）|ツールの制作者に関する情報。なくても動くが必須扱いにはされている。後述するreposには必要。urlの末尾の`?`は現在は不要だが、かつてはこれがないとvpmのバグでエラーになっていた。|
|author（必須？）|ツールの制作者に関する情報。なくても動くが必須扱いにはされている。|
|description|ツールの説明文。|
|vpmDependencies|他のvpmパッケージに依存している場合に指定。これが指定されていればツールをインストールする際に前提パッケージも一緒に入れてくれる。|
|dependencies|他の非vpmパッケージに依存している場合に指定。|
|legacyFolders|パッケージをインストールする際に消すファイル・フォルダ。Assetsに旧バージョンがあると重複してエラーになるのであとからVPMに移行する際はあったほうが良い。|

4. スクリプト（.cs）のルートフォルダにasmdef（Assembly Definition）を作成

5. asmdefの設定を適宜変更

|名前|説明|
|-|-|
|Name|asmdefの名前。名前は何でも良いが`com.example.tool`のようにパッケージ名に合わせられることが多い。EditorとRuntimeでスクリプトが分かれている場合、それぞれにasmdefを作成し、`com.example.tool.Editor`のように別の名前を指定。|
|Auto Referenced|**オフを強く推奨**。オフにすると他アセンブリから参照する際に明示的な指定が必要になるがコンパイルが早くなる。|
|Assembly Definition References|参照する他アセンブリ。上に`Use GUIDs`は謎のコンパイルエラーの原因になるので**オフを強く推奨**。|
|Platforms|基本はそのままで良い。Editorスクリプトの場合はAny Platformsのチェックを外し、Editorだけチェックを入れる。|
|Version Defines|該当パッケージがインストールされている場合にシンボルを定義。パッケージのインストール状況に応じてコードを変えられる。|

6. この時点でスクリプト関係のエラーが出ている場合は適宜`Assembly Definition References`に不足している参照を追加

7. おしまい！

## 手順（リポジトリ編）

vpm.jsonを作成して公開するだけです。jsonは手書きでもツールで生成してもGitHub Actionsで自動化しても良いです。一度リポジトリに登録したパッケージを削除すると**破壊が発生する**ため、削除しないようにしてください。

[Repos | VRChat Creator Companion](https://vcc.docs.vrchat.com/vpm/repos)

必要最低限の例
```
{
  "id": "com.example.vpm",
  "url": "https://vpm.example.com/vpm.json",
  "packages": {
    "com.example.tool": {
      "versions": {
        "1.0.0": {
          "name": "com.example.tool",
          "version": "1.0.0",
          "url" : "https://packages.example.com/com.example.tool-1.0.0.zip?"
        }
      }
    }
  }
}
```

[私が運用している実際の例](https://lilxyzw.github.io/vpm-repos/vpm.json)
