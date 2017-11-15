const fetch = require('node-fetch');

fetch('https://api.imgflip.com/get_memes')
  .then(resp => {
    return resp.json();
  })
  .then(json => {
    let memes = json.data.memes.map(item => item.url);
    memes;
  });
