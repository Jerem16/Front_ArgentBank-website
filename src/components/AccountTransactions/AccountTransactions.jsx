import React from "react";
import { useParams } from "react-router-dom";
import accountData from "../../assets/data/accountData.json";
import "./AccountTransactions.scss";

function AccountTransactions() {
    // Utilisez useParams pour obtenir l'ID de la transaction à partir de l'URL
    const { id } = useParams();

    // Recherchez la transaction correspondante dans les données de l'account
    const selectedAccount = accountData.accounts.find(
        (account) => account.id === id
    );

    // Déplacez la déclaration de transactions ici, juste après avoir trouvé le compte sélectionné
    let transactions = [];

    if (selectedAccount) {
        // Si le compte est trouvé, vous pouvez accéder à ses transactions
        transactions = selectedAccount.transactions;
    } else {
        console.log("Compte introuvable.");
        return <div>Compte introuvable.</div>; // Ajoutez un message d'erreur ici
    }

    function formatDate(dateString) {
        const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <section className="transactions" key={selectedAccount.id}>
            <h2 className="sr-only">Transactions</h2>
            <div className="account-content-wrapper">
                <div className="transactions-Labels">
                    <p className="transaction-label">Date</p>
                    <p className="transaction-label">Description</p>
                    <p className="transaction-label">Amount</p>
                    <p className="transaction-label">Balance</p>
                    <p className="transaction-icone">&nbsp;</p>
                </div>
                {transactions.map((transaction, index) => (
                    <div className="transactionsDetail" key={index}>
                        <p className="transaction-value">
                            {formatDate(transaction.date)}
                        </p>
                        <p className="transaction-value">
                            {transaction.description}
                        </p>
                        <p className="transaction-value">
                            {transaction.amount}
                        </p>
                        <p className="transaction-value">
                            {transaction.balance}
                        </p>
                        <p className="transaction-icone">hut</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default AccountTransactions;
