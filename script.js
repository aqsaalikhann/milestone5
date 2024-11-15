var form = document.getElementById("resume-form");
var resumeDisplay = document.getElementById("resume-display");
var shareableLink = document.getElementById("shareable-link");
var shareableLinkElement = document.getElementById("shareable-link-element");
var downloadPdfButton = document.getElementById("download-pdf");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    //collect input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone-no").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("work-experience").value;
    var skills = document.getElementById("skills").value;
    var resumeData = { name: name, email: email, phone: phone, education: education, experience: experience, skills: skills };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var resumeHTML = "\n      <div class=\"resume\">\n      <h1 class=\"center\">Editable Resume</h1>\n      <section>\n      <h2>Personal Information</h2>\n      <ul>\n        <li><strong>Name:</strong><span contenteditable=\"true\"> ".concat(name, "</span></li>\n        <li><strong>email:</strong><span contenteditable=\"true\"> ").concat(email, "</span></li>\n        <li><strong>contact No:</strong><span contenteditable=\"true\"> ").concat(phone, "</span></li>\n      </ul>\n      </section>\n      <section>\n       <h2>Education</h2>\n       <ul contenteditable=\"true\">\n       ").concat(education.split('\n').map(function (item) { return "<li>".concat(item, "</li>"); }).join(""), "\n       </ul>\n       </section>\n       <section>\n        <h2>Experience<h2>\n        <ul contenteditable=\"true\">\n        ").concat(experience.split('\n').map(function (item) { return "<li>".concat(item, "</li>"); }).join(""), "\n        </ul>\n        </section>\n        <section>\n        <h2>Skills</h2>\n        <ul contenteditable=\"true\">\n        ").concat(skills.split('\n').map(function (item) { return "<li>".concat(item, "</li>"); }).join(""), "\n        </ul>\n        </section>\n        </div>\n     ");
    resumeDisplay.innerHTML = resumeHTML;
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //show the shareable link
    shareableLink.style.display = "block";
    shareableLinkElement.textContent = shareableURL;
    shareableLinkElement.href = shareableURL;
});
downloadPdfButton.addEventListener("click", function () {
    window.print();
});
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("phone-no").value = resumeData.phone;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills;
        }
    }
});
