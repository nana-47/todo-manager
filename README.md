# todo-manager
【概要】<br>
JavaScriptを使った動的フォーム演習のためのTODO管理アプリです<br>
<br>
【テーブル】<br>
drop table if exists todos cascade;<br>
CREATE TABLE todos (<br>
id SERIAL PRIMARY KEY,<br>
todo_text text,<br>
grade integer,<br>
limit_date date,<br>
finish_date date<br>
);<br>
<br>
【実装予定の機能】<br>
■基本機能<br>
・TODOを入力フォームから追加すると、「完了待ち一覧」に表示される<br>
・「完了待ち一覧」で「完了」を押すと、「完了一覧」にTODOが移動する<br>
・「完了待ち一覧」もしくは「完了一覧」で「削除」を押すと、TODOが消える<br>
■追加機能<br>
・「完了待ち一覧」でも内容を編集できる<br>
・優先度や期日で並べ替えができる<br>
※非同期処理ですべて行う
<br>
<br>
【画面イメージ】<br>
![image](https://user-images.githubusercontent.com/105257871/189603536-4998f43b-1599-4aa7-85c0-cd2d4371a688.png)

