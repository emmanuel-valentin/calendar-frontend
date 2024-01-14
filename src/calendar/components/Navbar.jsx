const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Emmanuel Valentin
      </span>
      <button className="btn btn-outline-danger">
        <span>
          <i className="fas fa-sign-out-alt"></i> Salir
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
