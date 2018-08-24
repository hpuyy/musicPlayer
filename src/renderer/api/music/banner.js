import axios from '../axios';

export default function () {
  const require = new Promise((resolve, reject) => {
    axios.get('/banner',{}).then((data)=> {
      resolve(data.data);
    });
  });
  return require;
}
