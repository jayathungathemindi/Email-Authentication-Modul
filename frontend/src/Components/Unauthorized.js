import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <div className="lock"></div>
      <div className="message">
        <h1>Unauthorized</h1>
      </div>
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button className="btn btn-outline-warning" onClick={goBack}>
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
