const linkBtn = document.getElementById("copy-link");
const username = linkBtn.value;
const shareUrl = `<a href="https://gitpets.herokuapp.com/user/${username}" target="_blank"><img src="https://gitpets.herokuapp.com/pet/${username}"></a>`;
linkBtn.value = shareUrl;

const clipIcon = document.getElementById("clip-icon");

const copyToClipboard = () => {
  linkBtn.select();
  linkBtn.setSelectionRange(0, 99999);
  document.execCommand("copy");
  clipIcon.style.background = "#bf3858";
  clipIcon.textContent = "Copied";
};

clipIcon.addEventListener("click", copyToClipboard);
