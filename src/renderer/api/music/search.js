import axios from '../axios'

export default function (keyword) {
  let require = new Promise((resolve, reject) => {
    axios.get('/search',{
      params:{
        keywords:keyword
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
