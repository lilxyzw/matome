# VRChatアバター最適化・軽量化【脱Very Poor】

[[toc]]

## 最適化・軽量化って何？

どちらもアバターの表示によるPCの負荷を下げることです。この記事では最適化と軽量化の違いを

- 最適化は見た目を損なわずに行われるもの
- 軽量化はいくらか見た目を損なう場合があるもの

としていますが、一般的には最適化・軽量化もまとめて最適化とされるケースも多いです。

## なんで最適化したほうがいいの？

[パフォーマンスランク](https://creators.vrchat.com/avatars/avatar-performance-ranking-system/)があまりにも酷い場合は制限に引っかかり、他人視点から見たときにあなたの改変したアバターがちゃんと表示されなくなることがあります。つまり「多くの人に改変したアバターをちゃんと見てもらえるようにできる」というのが最大のメリットになります。逆にいえばフレンド以外の前で使わないアバターは無理に最適化しなくても良く、人前で使うアバターだけ最適化すればいいということでもあります。

あなたのアバターはインスタンスにいるみんなのCPUやGPUのリソースを使って表示されているため、極端に重いアバターを使うと迷惑になってしまうことがあります。そこで「みんなの負担を減らして快適にVRChatをできるようにしよう」というのが最適化・軽量化の**本来の**目的ですが、こちらは自分にとってのメリットが弱いかも……。

## とりあえずプロジェクトに最適化ツールを入れる

[Avatar Optimizer](https://vpm.anatawa12.com/avatar-optimizer/ja/)と[anatawa12's gists pack](https://vpm.anatawa12.com/gists/ja/)をプロジェクトに入れましょう。

インストールが完了したら`Tools/anatawa12's gist selector`から`ActualPerformanceWindow`にチェックを入れて`Apply Changes`をクリック。これで下準備ができました。

## 難しいことはわかんないけどとりあえず軽くしたい

メッシュ・マテリアルスロットの結合と不要なオブジェクト・BlendShapeの削除は[ここ](https://vpm.anatawa12.com/avatar-optimizer/ja/docs/tutorial/basic-usage/)の手順通りにやるとできます。

## ここから先はどっから手をつければええんや

再生ボタンをクリック。先程入れた`ActualPerformanceWindow`が出てきてパフォーマンスを確認できます。

ここで

- ビックリマークの出ている項目を全てなんとかすればPoor
- 赤色の丸をなんとかすればMedium
- 黄色の丸をなんとかすればGood
- 緑色の丸（星なし）をなんとかすればExcellent

になります。

つまりビックリマークの項目が最優先で手をつけるべきところとなります。ここから先の記事は手を付けたい項目から順に読みながら作業していきましょう。

## 各項目の最適化

### Texture Memory（テクスチャメモリが多すぎ）

ほとんどの場合はテクスチャの解像度を下げることで改善できます。なお、テクスチャ解像度の変更は**Unity上からできるので画像編集ソフトを使う必要はありません**。lilAvatarUtilsでテクスチャを一覧でき、解像度の変更やマテリアルからの削除を一括で行えます（[参考](https://note.com/coffee_monaka/n/n197fb85ade94)）。[専門の記事](https://qiita.com/lilxyzw/items/9aab99f976295971b8b0)も書いているので興味があれば読んでみて下さい。

### PhysBone Components（PhysBoneコンポーネントが多すぎ）

[AAO Merge PhysBone](https://vpm.anatawa12.com/avatar-optimizer/ja/docs/reference/merge-physbone/)でコンポーネントを統合できます。

### PhysBone Transforms（PhysBoneの影響ボーン数が多すぎ）

[AAO Merge Bone](https://vpm.anatawa12.com/avatar-optimizer/ja/docs/reference/merge-bone/)でボーンを間引けます。また、`AAO Merge PhysBone`のEnd PositionをCleared to zeroにせず、Overrideで設定することでも削減できます。

### PhysBone Colliders（PhysBoneのコライダーが多すぎ）

これはコライダーを消していくしかないです。細かすぎるコライダーを1つのコライダーで代用するなどしましょう。また、スカートで房ごとにInside Colliderを使っているのであれば[この記事](https://note.com/mikekirisima/n/n2fcb9e57f030)のようにPhysBoneを設定することで節約することができるかもしれません。

### PhysBone Collision Check Count（PhysBoneのコライダーの判定が多すぎ）

この値はPhysBoneの影響ボーン数×Collider数になります。影響ボーンもコライダーも多いPhysBoneコンポーネントはこの値に莫大な影響を与えるのでボーンかコライダーどちらかを削りましょう。

### Bones（ボーンが多すぎ）

通常は上のPhysBoneの影響ボーンを減らすとAAOのTrace And Optimizeで勝手に不要なボーンを結合してくれるので、この項目で引っかかることは少ないと思われます。

### Polygons（ポリゴン数が多すぎ）

以下のツールで不要なメッシュを消すことである程度対処できます。

- [AAO Remove Mesh By BlendShape](https://vpm.anatawa12.com/avatar-optimizer/ja/docs/reference/remove-mesh-by-blendshape/)
- [AAO Remove Mesh in Box](https://vpm.anatawa12.com/avatar-optimizer/ja/docs/reference/remove-mesh-in-box/)
- [AAO Remove Mesh By Mask](https://vpm.anatawa12.com/avatar-optimizer/ja/docs/reference/remove-mesh-by-mask/)

上のツールで限界まで削ってまだオーバーしている場合は以下のツールでデシメート（ポリゴンを荒くして数を抑える）できます。

- [NDMF Mantis Lod Editor](https://hitsub.booth.pm/items/5409262)
- [lilNDMFMeshSimplifier](https://github.com/lilxyzw/lilNDMFMeshSimplifier)

上のデシメートだと荒すぎる場合はBlenderが必要になりますが、[Cats Blender Plugin](https://github.com/absolute-quantum/cats-blender-plugin)でもう少しきれいにデシメートできます。これでも厳しい場合は[こちらの記事](https://creator.cluster.mu/2023/01/11/blender-3dweight/)の"ポリゴン数を削減する"の項目に従って手作業でなんとかしましょう。

### Material Slots（マテリアルスロットが多すぎ）

[TexTransTool](https://ttt.rs64.net/)の[AtlasTexture](https://ttt.rs64.net/docs/Tutorial/AtlasTexture-Tutorial)でマテリアルを結合しましょう。設定が似たようなマテリアル同士の結合であれば劣化を抑えられます。

### Lights（ライトが多すぎ）

ライトを使わなくてもいい手段を使いましょう。

アバターの明るさ調整
→ マテリアルの明るさの下限・上限やUnlit化をアニメーションで調整することで対処できます

ワールドが暗い
→ 完全な黒とかでなければ暗視シェーダーで対処できます

### Bounds

アバターに適切なBoundsを設定しましょう。Modular Avatarの[Mesh Settings](https://modular-avatar.nadena.dev/ja/docs/reference/mesh-settings)をアバターのルートにつければ一括で調整できます。基本的にはアバターを全体を覆える立方体になればOKだと思います。デカすぎるアバターを使っている場合はどうしようもありません。Unity上では小さくしてVRChat上のアバタースケーリングで大きくするのも手かも……？

### Contact Count

ギミックの最適化は正直ギミックによって異なるため解説できません。基本的にはアバターに含まれるギミックを削るしかないと思われます。

### Cloth

Clothが存在するだけでVery Poorになります。これは影響頂点やレートを計算せず一律にアウトにするVRChatが悪いためどうしようもありません……。

### パーティクル関係

シェーダーでパーティクルを作ってしまい、Particle Systemを使わないため知見が十分になくてわかりません……。

### Physics

私がPhysicsを使わないためわかりません……。

## 全部やったけどVery Poorを脱却できない

1アバターに何着か衣装を詰め込んでるとどうしようもなかったりします。衣装ごとにアバターを分けることで対処しましょう。それでも難しい場合は衣装デザイン的に難しいパターンかもしれません……。