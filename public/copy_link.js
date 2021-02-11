const linkBtn = document.getElementById("copy-link");

linkBtn.addEventListener("click", () => {
  linkBtn.select();
  linkBtn.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.getElementById("clip-icon").style.background("#bf3858");
});
