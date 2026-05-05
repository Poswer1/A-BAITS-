const url = 'http://localhost:3002/auth/login';
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'knozenko2@gmail.com', password: '22042010' })
}).then(r => r.json()).then(data => {
  fetch('http://localhost:3000/uk/admin/users', {
    headers: { Cookie: 'token=' + data.token }
  }).then(r => r.text()).then(html => {
    const start = html.indexOf('<div class="flex flex-col md:flex-row justify-start items-start');
    if (start > -1) {
       console.log('Layout found. Extracting content...');
       console.log(html.substring(start, start + 1000));
    } else {
       console.log('Layout not found! Printing body start:');
       const bodyStart = html.indexOf('<body');
       console.log(html.substring(bodyStart, bodyStart + 1000));
    }
  })
});
