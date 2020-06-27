※ 日本語説明はページ下部にございます。

# ask_professionals_admin: A simple admin page

This is a simple web application for admins of the product made out of ask_professionals: https://github.com/BumpeiShimada/ask_professionals

Since investigating the conversation is pretty annoying from Firestore Console, this is created so an admin user can see the messages in the conversations easily.

![demo](https://raw.githubusercontent.com/wiki/BumpeiShimada/ask_professionals/images/reduced_admin_demo.gif)

## Get Started

1. Startup a chat app with this repository: https://github.com/BumpeiShimada/ask_professionals
2. Add a new web app to your Firebase project: https://firebase.google.com/docs/web/setup#register-app
3. Replace the values in `/src/config/profect.ts` along with your Firebase web app configulation
4. Create an admin user and allow it to read any conversation on Firestore Rule (See: https://github.com/BumpeiShimada/ask_professionals#before-publication )
5. Hit `$ yarn serve` to bootup the application
6. Login with the admin account
7. Start checking how advisors and users are talking 🕵️‍♂️

## Tech Stacks

### Vue Plugins
- vue-class-component
- vue-property-decorator
- vue-router
- vuex

### Design
Buefy is used https://buefy.org/


# ask_professionals_admin: アドミン向けWebアプリケーション

これは ask_professionals で作られたアプリケーションのためのアドミン画面です: https://github.com/BumpeiShimada/ask_professionals

Firestore のコンソール画面から各チャットの中身を見るのが非常に大変なために作りました。

![demo](https://raw.githubusercontent.com/wiki/BumpeiShimada/ask_professionals/images/reduced_admin_demo.gif)

## スタートアップガイド

1. ask_professioanals を使ってチャットアプリを立ち上げる: https://github.com/BumpeiShimada/ask_professionals
2. Firebase プロジェクトに Web アプリを追加する: https://firebase.google.com/docs/web/setup#register-app
3. `/src/config/profect.ts` の値を、作成した Firebase の Web アプリのコンフィグに差し替える
4. アドミンユーザーを作成し、そのユーザーがあらゆる conversation document を read 出来るように Firestore の Rules を設定する (See: https://github.com/BumpeiShimada/ask_professionals#before-publication )
5. `$ yarn serve` コマンドを打ってアプリを起動する
6. 作ったアドミンユーザーでログインする
7. チャットの中身を見る 🕵️‍♂️

## 技術スタックについて

### 今回採用した Vue の公式 Plugin
- vue-class-component
- vue-property-decorator
- vue-router
- vuex

### Design
Buefy で作成しています https://buefy.org/
