document.addEventListener("DOMContentLoaded", ()=>{
    const eventBtn = document.getElementById("event-btn");
    const birthdayBtn = document.getElementById("birthday-btn");
    const birthdayContainer = document.querySelector(".birthday-wrap");
    const eventContainer = document.querySelector(".event-wrap");
    console.log(eventContainer);

    eventBtn.addEventListener("click", ()=>{
       eventContainer.style.display = "grid";
       birthdayContainer.style.display = "none";
       eventBtn.classList.toggle("btn-active");
       birthdayBtn.classList.remove("btn-active");
    });

    birthdayBtn.addEventListener("click", ()=>{
        eventContainer.style.display = "none";
        birthdayContainer.style.display = "grid";
        birthdayBtn.classList.toggle("btn-active");
        eventBtn.classList.remove("btn-active");
    });
});