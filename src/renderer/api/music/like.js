import axios from '../axios'

export default function (id, like = true) {
  let require = new Promise((resolve, reject) => {
    axios.get('/like',{
      params:{
        id: id,
        like: like,
        timestamp: new Date().getTime()
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require
}