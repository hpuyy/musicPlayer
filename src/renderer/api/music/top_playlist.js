import axios from '../axios';

export default function (cat = '全部', offest = 0) {
  const require = new Promise((resolve, reject) => {
    axios.get('/top/playlist',{
      params:{
        limit: 20,
        order: 'hot',
        offset: offest,
        cat: cat
      }
    }).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
