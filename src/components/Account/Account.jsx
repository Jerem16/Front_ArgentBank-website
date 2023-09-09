import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import accountData from "../../assets/data/accountData.json";

import "./account.scss";

function Account() {
    // Utilisez useParams pour obtenir l'ID de la transaction à partir de l'URL
    const { id } = useParams();
    const accountId = id;
    // Recherchez la transaction correspondante dans les données de l'account
    const selectedAccount = accountData.accounts.find(
        (account) => account.id === accountId
    );

    if (selectedAccount) {
        // Si le compte est trouvé, vous pouvez accéder à ses transactions
        const transactions = selectedAccount.transactions;
        console.log("Transactions du compte sélectionné :", transactions);
    } else {
        console.log("Compte introuvable.");
    }
    return (
        <>
            <h1 className="sr-only">UserAccount</h1>

            <section className="accountPage" key={selectedAccount.id}>
                <h2 className="sr-only">Accounts</h2>
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        {selectedAccount.title}
                    </h3>
                    <p className="account-amount">{selectedAccount.amount}</p>
                    <p className="account-amount-description">
                        {selectedAccount.description}
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <Link to={`/user`}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Account;
