import axios from '../axios'

export default function (keyword, offset) {
  let require = new Promise((resolve, reject) => {
    axios.get('/search',{
      params:{
        keywords:keyword,
        limit: 30,
        offset: offset
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
