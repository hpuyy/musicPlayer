/* 项目中使用 axios 一直无法解决跨域接受Cookie的问题，这里使用jq*/
import $ from 'jquery';

export default function (phone, pwd) {
  const require = new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3000/login/cellphone',
      method: 'get',
      data:{
        phone: phone,
        password: pwd
      },
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        if(data.code === 200) resolve(data);
      }
    });
  });
  return require;
}
