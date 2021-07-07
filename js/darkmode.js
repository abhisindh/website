var darkMode=false;
function toggleDarkmode(){
  if (darkMode==false){
    document.body.classList.add("darkmode");
    darkMode=true;
  }else{
    document.body.classList.remove("darkmode");
    darkMode=false;
  }

}