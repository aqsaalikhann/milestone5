const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display") as HTMLDivElement;
const shareableLink = document.getElementById("shareable-link") as HTMLDivElement;
const shareableLinkElement =document.getElementById("shareable-link-element") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

form.addEventListener("submit",(event:Event) =>{
    event.preventDefault();
    

//collect input values
    const username =(document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email =(document.getElementById("email")as HTMLInputElement).value;
    const phone =(document.getElementById("phone-no") as HTMLInputElement).value;
    const education =(document.getElementById("education") as HTMLTextAreaElement).value;
    const experience =(document.getElementById("work-experience") as HTMLTextAreaElement).value;
    const skills =(document.getElementById("skills") as HTMLTextAreaElement).value;


    const resumeData ={name, email, phone, education, experience, skills}
    localStorage.setItem(username, JSON.stringify(resumeData));


    const resumeHTML = `
      <div class="resume">
      <h1 class="center">Editable Resume</h1>
      <section>
      <h2>Personal Information</h2>
      <ul>
        <li><strong>Name:</strong><span contenteditable="true"> ${name}</span></li>
        <li><strong>email:</strong><span contenteditable="true"> ${email}</span></li>
        <li><strong>contact No:</strong><span contenteditable="true"> ${phone}</span></li>
      </ul>
      </section>
      <section>
       <h2>Education</h2>
       <ul contenteditable="true">
       ${education.split('\n').map(item => `<li>${item}</li>`).join("")}
       </ul>
       </section>
       <section>
        <h2>Experience<h2>
        <ul contenteditable="true">
        ${experience.split('\n').map(item => `<li>${item}</li>`).join("")}
        </ul>
        </section>
        <section>
        <h2>Skills</h2>
        <ul contenteditable="true">
        ${skills.split('\n').map(item => `<li>${item}</li>`).join("")}
        </ul>
        </section>
        </div>
     `;
     
     resumeDisplay.innerHTML =resumeHTML;
     const shareableURL =`${window.location.origin}?username=${encodeURIComponent(username)}`;

    //show the shareable link
    shareableLink.style.display="block"
    shareableLinkElement.textContent =shareableURL;
    shareableLinkElement.href =shareableURL;
});

downloadPdfButton.addEventListener("click" , ()=>{
  window.print();
});

window.addEventListener("DOMContentLoaded" ,() =>{
  const urlParams = new URLSearchParams(window.location.search);
  const username =urlParams.get("username");

if (username) {
  const savedResumeData = localStorage.getItem(username);
  if (savedResumeData) {
    const resumeData = JSON.parse(savedResumeData);
    (document.getElementById("username")as HTMLInputElement).value= username;
    (document.getElementById("name")as HTMLInputElement).value= resumeData.name;
    (document.getElementById("email")as HTMLInputElement).value=resumeData.email;
    (document.getElementById("phone-no")as HTMLInputElement).value= resumeData.phone;
    (document.getElementById("education")as HTMLTextAreaElement).value= resumeData.education;
    (document.getElementById("experience")as HTMLTextAreaElement).value= resumeData.experience;
    (document.getElementById("skills")as HTMLTextAreaElement).value= resumeData.skills;

  }

}

});

