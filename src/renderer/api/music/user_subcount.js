import axios from '../axios';

export default function (id) {
  const require = new Promise((resolve, reject) => {
    axios.get('/user/subcount',{
      params:{
        cid:id
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
