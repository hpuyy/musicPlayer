import axios from '../axios';

export default function (id) {
  const require = new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8888/',{
      params:{
        id: id
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
