# Steelydylan Portfolio Site

## 使い方

### **Notion にてデータベースを作る**

まずは Notion にてデータベースを作りましょう。`/table`と入力するとテーブルブロックが作成できますが、これがデータベースに当たります。

テーブルに以下のようなプロパティを用意

- Page ポートフォリオのタイトル
- Slug ポートフォリオを表示する際の URL に使用
- Published ポートフォリオを表示するかどうか
- Date ポートフォリオの日付
- Authors この記事を書いた人
- Thumbnail 記事のサムネイル
- Description ポートフォリオの簡単な説明

### **Notion にて Secret Key とデータベース ID を取得する**

次に Notion にて Secret Key とデータベース ID を取得します。

まずは Secret Key を取得しましょう。

Notion のページより Settings & Members → Integrations → Develop your own integrations の順に移動していただき、新しい Integration を作成することで Secret Key を取得できます。

次に先ほど作成したテーブルに対して作成した integration を招待します。

Notion のの右上にある Share ボタンをクリックし表示されるポップオーバーにて、Invite より作成した integration を招待してください

次にデータベース ID を取得します。

テーブルのページは以下のような URL になっていて、

```html
https://www.notion.so/*****************?v=xxxxxxxxxxxxxxxx
```

`****************`の部分がデータベース ID になるので控えておきます。

.env ファイルに控えておいた情報を入力します

```html
NOTION_DATABASE_ID= NOTION_TOKEN=
```

あとは 以下のコマンドで表示確認！

```bash
yarn
yarn dev
```
