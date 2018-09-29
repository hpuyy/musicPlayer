import axios from '../axios'

export default function (cat, initial, offset = 0, limit = 20) {
  let require = new Promise((resolve, reject) => {
    axios.get('/artist/list',{
      params:{
        cat: cat,
        initial: initial,
        offset: offset,
        limit: limit
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require
}
