import axios from '../axios'

export default function () {
  let require = new Promise((resolve, reject) => {
    axios.get('/personalized',{}).then((data)=> {
      resolve(data.data);
    });
  });
  return require
}