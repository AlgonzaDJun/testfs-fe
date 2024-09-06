const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  window.location.href = "/";

  return <div></div>;
};

export default Logout;
