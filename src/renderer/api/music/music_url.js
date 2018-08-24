import axios from '../axios';

export default function (id) {
  const require = new Promise((resolve, reject) => {
    axios.get('/music/url',{
      params:{
        id: id
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
