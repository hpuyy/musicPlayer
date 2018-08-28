import axios from '../axios'

export default function (t, id) {
  let require = new Promise((resolve, reject) => {
    axios.get('/playlist/subscribe',{
      params:{
        t: t,
        id: id
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require
}