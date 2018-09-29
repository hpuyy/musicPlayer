import axios from '../axios'

export default function (id) {
  let require = new Promise((resolve, reject) => {
    axios.get('/artists',{
      params:{
        id: id
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require
}
