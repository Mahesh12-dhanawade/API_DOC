*GetAllUser/ 
(GET)> https://developerjwt.herokuapp.com/api/auth/users
(GET) => http://localhost:5000/api/auth/users

/*Register/ 
(POST)> https://developerjwt.herokuapp.com/api/auth/register 
(POST) > http://localhost:5000/api/auth/register
(body) => {"name":"Aakash", "email":"aa@gmail.com","password":"12345678","phone":343432,role?":"user"}

/*Login/ 
(POST) => https://developerjwt.herokuapp.com/api/auth/login 
(POST) => http://localhost:5000/api/auth/login
(body) => {"email":"aa@gmail.com","password":"12345678"} (response)=> {auth:true,token:'dgsdg'}

/*UserInfo/ 
(GET) => https://developerjwt.herokuapp.com/api/auth/userinfo 
(GET) => http://localhost:5000/api/auth/userInfo
(Header) => {'x-access-token':'token value from login'}