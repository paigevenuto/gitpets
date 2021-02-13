const linkBtn = document.getElementById("copy-link");
const username = linkBtn.value;
const shareUrl = `<a href="https://gitpets.herokuapp.com/user/${username}"><img src="https://gitpets.herokuapp.com/pet/${username}"></a>`;
linkBtn.value = shareUrl;

const copyToClipboard = () => {
  linkBtn.select();
  linkBtn.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.getElementById("clip-icon").style.background = "#bf3858";
};

document.getElementById("clip-icon").addEventListener("click", copyToClipboard);
