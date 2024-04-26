# amplify-auth-limited

🐺🐺🐺 AmplifyフレームワークのAuth機能を用いて、登録できるユーザを限定してみる！  

## 準備

```shell
aws ssm put-parameter \
  --name "/amplify/<AppId>/<ENV>/AMPLIFY_amplifyauthlimited5f1f1e70PreSignup_ALLOWED_EMAIL_REGEX_LIST" \
  --value "<VALUE>" \
  --type "String" \
  --overwrite
```
