# API 仕様

## REST

※プロパティ名の末尾に `?` がついているものは、空の値であることを許容する

### ユーザ情報

```typescript
type User = {
  id: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  name: string;
  password: string; // とりあえずは文字列としてもっておく
};
```

| Method | Endpoint  | Args             | Return  | 　 Description                |
| ------ | --------- | ---------------- | ------- | ----------------------------- |
| POST   | users/    | name, password   | User    | 　 ユーザ情報の登録           |
| GET    | users/    |                  | User[]  | 　 全ユーザ情報の取得         |
| GET    | users/:id |                  | User    | 　 該当 ID のユーザ情報の取得 |
| PUT    | users/:id | name?, password? | User    | 　 該当 ID のユーザ情報の更新 |
| DELETE | users/:id |                  | boolean | 　 該当 ID のユーザ情報の削除 |

### ルーム情報

```typescript
type Room = {
  id: string;
  ownerId: string; // ルームを作成したユーザのID
  createdAt: Date;
  lastUpdatedAt: Date;
  isOpen: boolean; // 入室可能かどうか
  isStarted: boolean; // ゲームが開始したかどうか
  name: string;
  password: string?; // 任意で設定できる入室パスワード
};
```

| Method | Endpoint             | Args                     | Return | Description                                  |
| ------ | -------------------- | ------------------------ | ------ | -------------------------------------------- |
| POST   | rooms/               | ownerId, name, password? | Room   | ルーム情報を登録                             |
| GET    | rooms/users/:id      |                          | Room[] | 該当 ID のユーザが作成した全ルーム情報の取得 |
| GET    | rooms/:id            |                          | Room   | 該当 ID のルーム情報の取得                   |
| PUT    | rooms/:id            | name?, password?         | Room   | 該当 ID のルーム情報の更新                   |
| PUT    | rooms/:id/state      | isOpen                   | Room   | 該当 ID のルームの入室可否を更新             |
| PUT    | rooms/:id/game-state | isStarted                | Room   | 該当 ID のルームのゲーム開始状態を更新       |
