const https = require('https');
https.get('https://ramakrishna-johannesburg.org.za/learn/games/aum-chanter', (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    const match = html.match(/<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>/);
    if (match) {
      https.get('https://ramakrishna-johannesburg.org.za' + match[1], (res2) => {
        let js = '';
        res2.on('data', d => js += d);
        res2.on('end', () => {
          console.log('Includes SUPABASE KEY?', js.includes('zlCjSjqW9rQCFA7sDUMB5Q_fsvaaYUi'));
          console.log('Includes SUPABASE URL?', js.includes('hzarmvixgfrnaclcberb'));
        });
      });
    }
  });
});
