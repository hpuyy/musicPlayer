import axios from '../axios';

export default function (url) {
  const require = new Promise((resolve, reject) => {
    axios.get('/r/loadSrc',{
      params:{
        url:url
      },
    }).then((data)=> {
      resolve(data);
    });
  });
  return require;
}
