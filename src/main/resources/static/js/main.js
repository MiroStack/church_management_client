document.addEventListener("DOMContentLoaded",  ()=>{
   const root = document.querySelector(".root");
   const sidenav = document.querySelector(".sidenav-wrap");
   const burgerBtn = document.querySelector(".burger-menu");
   const sideClosed = document.querySelector(".closed-icon");
   const loginBtn = document.querySelectorAll(".login-btn");
   const loginForm = document.querySelector(".login-wrap");
   const closedLogin = document.querySelector(".closed-login");

   const login = document.querySelector(".submit-btn");

    login.addEventListener("click", ()=>{
       var username = $("#username").val();
       var password = $("#password").val();
       if(password.toLowerCase() == 'admin' && username.toLowerCase() == 'admin'){
            window.location.replace("/dashboard");
       }else if (password.toLowerCase() == 'member' && username.toLowerCase() == 'member'){
           window.location.replace("/dashboardMember");
       }else{
            alert("wrong credentials");
       }
    });

   burgerBtn.addEventListener("click",()=>{
       root.classList.toggle("dimmed");
       document.body.style.overflow = 'hidden'; // Disable scroll
       sidenav.classList.toggle("sidenav-open")
       sidenav.classList.remove("sidenav-closed")

   });
   sideClosed.addEventListener("click", ()=>{
       sidenav.classList.toggle("sidenav-closed")
       document.body.style.overflow = ''; // Disable scroll
       sidenav.classList.remove("sidenav-open")
       root.classList.remove("dimmed");

   });
   loginBtn.forEach(btn=>{
       btn.addEventListener("click", ()=>{
           loginForm.classList.toggle("showlogin");
           root.classList.toggle("dimmed");
           document.body.style.overflow = 'hidden';
       });
   })
   closedLogin.addEventListener("click", ()=>{
       loginForm.classList.remove("showlogin");
       root.classList.remove("dimmed");
       document.body.style.overflow = '';
   });
});