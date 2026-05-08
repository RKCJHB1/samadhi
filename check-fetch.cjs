const url = 'https://hzarmvixgfrnaclcberb.supabase.co/rest/v1/aum_stats?select=global_chants%2Crecord_chants%2Cavg_chants_per_user%2Cunique_users%2Cunique_countries&id=eq.1';
const key = 'sb_publishable_zlCjSjqW9rQCFA7sDUMB5Q_fsvaaYUi';
fetch(url, { headers: { 'apikey': key, 'Authorization': 'Bearer ' + key } })
  .then(r => r.json())
  .then(console.log);
