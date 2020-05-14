const frequency = [
  '１年に１度',
  '１月に１度',
  '１年に１度',
  '１時間に１度',
  '１分に１度',
  '５秒に１度',
  '３秒に１度',
  '１秒に１度'
];



//1.Save クリックイベント
$('#save').on('click', function () {
  let now = new Date();
  let year = String(now.getFullYear());
  let month = String(now.getMonth() + 1);
  let date = String(now.getDate());
  let hour = String(now.getHours());
  let min = String(now.getMinutes());
  let sec = String(now.getSeconds());

  const key = year + month + date + hour + min + sec;
  const title = $("#i_title").val();
  const summary = $('#i_summary').val();
  const action = $('#i_action').val();
  const reminder = $('#i_reminder').val();
  const json = '{"title": "' + title + '", "summary": "' + summary + '", "action": "' + action + '", "reminder": "' + reminder + '"}';
  localStorage.setItem(key, json);
  // const html = '<tr><th>' + key + '</th><td>' + json + '</td></tr>';
  const html =
    '<li class="card"><div div class="action_info" ><p class="action">' + action + '</p><p class="reminder">' + frequency[reminder] + '</p></div><div class="book_info"><p class="title">' + title + '</p><p class="summary">' + summary + '</p></div></li >';
  $('.cards').append(html);

  location.reload();
});

// 2.clear クリックイベント
$('#clear').on('click', function () {
  localStorage.clear();
  $('.cards').empty();
  Push.create('Push 通知だよ！');
});



//3.ページ読み込み：保存データ取得表示
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const json = JSON.parse(localStorage.getItem(key));
  console.log(json.reminder);
  // const json = {"title": "111", "summary": "111", "action": "111"};
  const html =
    '<li class="card"><div div class="action_info" ><p class="action">' + json.action + '</p><p class="reminder">' + frequency[parseInt(json.reminder)] + '</p></div><div class="book_info"><p class="title">' + json.title + '</p><p class="summary">' + json.summary + '</p></div></li >';
  $('.cards').append(html);
  remind(json);
}


Push.Permission.request();



function remind(json) {
  let interval;
  switch (json.reminder) {
    case '5':
      interval = 5000;
      break;

    case "6":
      interval = 3000;
      break;

    case "1":
      interval = 1000;
      break;

    default:
      interval = 3000;
      break;
  }

  setInterval(function () {
    Push.create('リマインドです！', {
      body: json.action,
      // icon: 'icon.png',
      timeout: 1000, // 通知が消えるタイミング
      vibrate: [100, 100, 100], // モバイル端末でのバイブレーション秒数
      onClick: function () {
        // 通知がクリックされた場合の設定
        console.log(this);
      }
    });
  }, interval);
}
