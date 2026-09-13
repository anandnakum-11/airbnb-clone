async function run() {
  const res = await fetch('https://html.duckduckgo.com/html/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: 'q=' + encodeURIComponent('Romantic Jacuzzi 1BHK Candolim Mirashya UG10 airbnb')
  });
  const html = await res.text();
  const snippets = [...html.matchAll(/<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const urls = [...html.matchAll(/<a class="result__url[^>]*href="([^"]+)"/g)].map(m => m[1]);
  console.log('URLs:', urls.slice(0, 5));
  console.log('Snippets:', snippets.slice(0, 5));
}
run();
