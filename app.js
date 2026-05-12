document.addEventListener("DOMContentLoaded", () => {

  const target = document.querySelector("[mindar-image-target]");

  target.addEventListener("targetFound", () => {

    console.log("TARGET BULUNDU");

    alert("TARGET BULUNDU");

  });

});