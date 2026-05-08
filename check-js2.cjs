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
          const idx = js.indexOf('createClient(');
          console.log('createClient snippet:', js.substring(Math.max(0, idx - 100), idx + 100));
        });
      });
    }
  });
});
