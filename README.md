# 開発手順

## リポジトリ

- [バックエンド](https://github.com/yotarotsukada/sss-games-service)
- [フロントエンド](https://github.com/yotarotsukada/sss-games-client)

## 開発環境構築

1. ソフトウェアのインストール

   - VS Code
   - git

1. リポジトリのクローン

   ```
   git clone [リポジトリのURL]
   ```

1. 開発サーバーの起動
   ```
   yarn
   yarn dev
   ```

## 開発手順

1. develop ブランチから開発用ブランチを作成&移動

   ```
   git checkout develop
   git checkout -b [ブランチ名]
   ```

1. 実装
1. キリの良いところでコミット

   ```
   git add -A
   git commit -m "[コミットメッセージ]"
   ```

   ※自動でフォーマットがかかるので、変更が加わってしまった場合は再度コミットする

   ```
   git add -A
   git commit -m "[コミットメッセージ]" --amend
   ```

1. リモートにプッシュ

   ```
   git push HEAD
   ```

   ※エラーが出た場合、

   - add, commit がうまくできているか確認する
   - 次のコマンドを試す

     ```
     git pull develop
     ```

     ただし上記を実行するとコンフリクトが発生する可能性がある

1. リポジトリにて Pull Request を作成

   - 実装内容を簡単に記入しておく

1. マージされたらローカルのブランチを整理
   ```
   git checkout develop
   git pull --prune
   git branch -D [作業していたブランチ]
   ```
