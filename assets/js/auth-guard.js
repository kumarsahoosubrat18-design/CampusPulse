(() => {
  const requiredRole = document.currentScript.getAttribute("data-required-role");

  if (sessionStorage.getItem("aersDemoRole") !== requiredRole) {
    window.location.replace(`login.html?role=${requiredRole}`);
  }
})();
