import { Link } from "react-router-dom";

function Error() {
    return (
        <main className="error-404">
            <h1 className="error-404_h1">404</h1>
            <p className="error-404_p">Oups! La page que <span>vous demandez n'existe pas.</span>
            </p>
            <Link to="/" className="error-404_a">
                Retourner sur la page d’accueil
            </Link>
        </main>
    );
}

export default Error;
