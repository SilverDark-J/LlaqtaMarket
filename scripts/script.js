function menuDeslizable() {

  const menu = document.getElementById("menuOpciones");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }

}