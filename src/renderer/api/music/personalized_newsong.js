import axios from '../axios';

export default function () {
  const require = new Promise((resolve, reject) => {
    axios.get('/personalized/newsong',{}).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
