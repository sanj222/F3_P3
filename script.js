const form = document.getElementById("signup-form");
const btn = document.getElementById("btn");
const extra = document.getElementById("extra");




form.addEventListener("submit",(e)=>{
    e.preventDefault();
    extra.style.display ="none";
    
    const uName = document.getElementById("name").value;
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
   
    
    if(password !== cpassword)
    {     extra.innerHTML =" ";
          const errorStatement = document.createElement("p");
          errorStatement.innerText= "Error: Passwords are not matching!";
          errorStatement.style.color ="red";
          extra.appendChild(errorStatement);
          extra.style.display ="block";

          return;
    }    

    const token = generateAccessToken();
    extra.innerHTML =" ";
    
    const userState =
    {
       userName : uName,
       email : mail,
       password : password,
       confirmPassword : cpassword,
       accessToken : token
    }

    localStorage.setItem("userState", JSON.stringify(userState));

    const successStatement = document.createElement("p");
    successStatement.innerText= "Successfully Signed Up!";
    successStatement.style.color ="green";
    extra.appendChild(successStatement);
    extra.style.display ="block";


    setTimeout(redirect,1000);
    

});

function redirect(){
    window.location.href ='profile.html';
}

function generateAccessToken() {
        const randomBytes = new Uint8Array(16);
        crypto.getRandomValues(randomBytes);
        return Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
      }


btn.addEventListener("click",()=>{
    extra.innerHTML="";
    const uName = document.getElementById("name").value;
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    if(uName==="" || mail==="" || password==="" || cpassword==="")
    {
       const errorStatement = document.createElement("p");
       errorStatement.innerText= "Error: All the fields are mandatory";
       errorStatement.style.color ="red";
       extra.appendChild(errorStatement);
       extra.style.display ="block";
    }
    
})

function atProfile(){
    if (isAuthenticated()){
      window.location.href = 'profile.html';
    }
  
    const userData = JSON.parse(localStorage.getItem('userData'));
    let name = document.getElementById("user-name");
    let em = document.getElementById("user-email");
    let p = document.getElementById("user-pass");
  
     name.innerHTML =`${userData.name}`;
     em.innerHTML =`${userData.email}`;
     p.innerHTML =`${userData.password}`;
  
  
  }  
  
  function logout(){
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
  }
  
  // function to generate access token
  function generateToken(length=10){
    const tokens = new Uint8Array(length);
    crypto.getRandomValues(tokens);
  
    const token = Array.from(tokens, byte => byte.toString(16).padStart(2, '0')).join('');
    return token;
  }