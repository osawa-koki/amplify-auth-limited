# amplify-auth-limited

🐺🐺🐺 AmplifyフレームワークのAuth機能を用いて、登録できるユーザを限定してみる！  

![成果物](./fruit.gif)  

## 準備

```shell
# `Amplify CLI`をインストール
yarn global add @aws-amplify/cli

# Amplifyの認証
amplify configure

# プロジェクトの初期化
amplify init

# プロジェクトにホスティング機能を追加
amplify add hosting

# プロジェクトに認証機能を追加  
amplify add auth

# プロジェクトをプッシュ
amplify push

# プロジェクトを公開
amplify publish

# -----

# モジュールをインストール
yarn install

# ローカルサーバーを起動
yarn dev
```

## デプロイ

`v-*`という形式のタグをつけると、GitHub Actionsで自動的にデプロイされます。  
GitHub Actionsのシークレット情報として以下の情報を設定してください。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキー |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | AWSのリージョン |

---

今回は、SSMを使用して登録可能なメールアドレスの正規表現パターンを保持しています。  
具体的には、`./amplify/backend/function/amplifyauthlimited5f1f1e70PreSignup/amplifyauthlimited5f1f1e70PreSignup-cloudformation-template.json`の`ALLOWED_EMAIL_REGEX_LIST`を設定しています。  
また、上記で使用する値を`amplify/team-provider-info.json`で指定しています。  

`ALLOWED_EMAIL_REGEX_LIST`環境変数にはSSMのパラメタストアのキーを指定し、`./amplify/backend/function/amplifyauthlimited5f1f1e70PreSignup/src/email-filter-allowlist.ts`で使用しています。  
また、LambdaからSSMにアクセスするために必要な権限を`./amplify/backend/function/amplifyauthlimited5f1f1e70PreSignup/amplifyauthlimited5f1f1e70PreSignup-cloudformation-template.json`に追加しています。  

パラメタを登録するためには以下のコマンドを実行します。  

```shell
aws ssm put-parameter \
  --name "/amplify/<AppId>/<ENV>/AMPLIFY_amplifyauthlimited5f1f1e70PreSignup_ALLOWED_EMAIL_REGEX_LIST" \
  --value "<VALUE>" \
  --type "String" \
  --overwrite
```
