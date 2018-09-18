import axios from '../axios'

export default function (phone, pwd) {
  const require = new Promise((resolve, reject) => {
    axios.get('/login/cellphone', {
      params:{
        phone: phone,
        password: pwd
      }
    }).then((data)=> {
      if(data.data.code === 200) resolve(data.data);
      else reject();
    });
  });
  return require;
}
