import React, { useState } from "react";
import { useParams } from "react-router-dom";
import accountData from "../../assets/data/accountData.json";
import "./AccountTransactions.scss";
import "./collapse.scss";

function AccountTransactions() {
    const [isCollapsed, setIsCollapsed] = useState(null);
    const [editableCategory, setEditableCategory] = useState("");
    const [editableNote, setEditableNote] = useState("");
    const handleClick = (index) => {
        setIsCollapsed(index === isCollapsed ? null : index);
    };

    const { id } = useParams();
    let transactions = [];
    const selectedAccount = accountData.accounts.find(
        (account) => account.id === id
    );

    if (selectedAccount) {
        transactions = selectedAccount.transactions;
    } else {
        console.log("Compte introuvable.");
        return <div>Compte introuvable.</div>;
    }

    function formatDate(dateString) {
        const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function handleSetEditableNote(selectedTransaction) {
        setEditableNote(selectedTransaction.note);
    }
    function handleSetEditableCategory(selectedTransaction) {
        setEditableCategory(selectedTransaction.category);
    }

    return (
        <section className="transactions" key={selectedAccount.id}>
            <h2 className="sr-only">Transactions</h2>
            <div className="account-content-wrapper">
                <div className="transactions-labels">
                    <p className="transaction-label">Date</p>
                    <p className="transaction-label">Description</p>
                    <p className="transaction-label">Amount</p>
                    <p className="transaction-label">Balance</p>
                    <p className="transaction-icone">&nbsp;</p>
                </div>
                <div>
                    {transactions.map((transaction, index) => (
                        <div className="transactionsColumnDetail" key={index}>
                            <span className="transactions-details">
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
                                <p
                                    className="transaction-icone"
                                    onClick={() => handleClick(index)}
                                >
                                    <i
                                        className={`fa fa-chevron-up`}
                                        style={{
                                            color: "lightgrey",
                                            transformOrigin: "center",
                                            transform: `rotate(${
                                                index === isCollapsed
                                                    ? "-180deg"
                                                    : "0deg"
                                            })`,
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                    ></i>
                                </p>
                            </span>
                            <form
                                className={`collapse-content ${
                                    index === isCollapsed ? "opened" : "closed"
                                }`}
                                style={{
                                    maxHeight:
                                        index === isCollapsed ? "1000px" : "0",
                                    transform: `scaleY(${
                                        index === isCollapsed ? 1 : 0
                                    })`,
                                    transformOrigin: "top",
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
                                <div className="transactions_Collapsed-Details">
                                    <label
                                        htmlFor="transaction_Type"
                                        className="transaction-value"
                                    >
                                        Transaction type
                                    </label>
                                    <input
                                        className="transaction-input"
                                        type="text"
                                        id="transaction_Type"
                                        value={transaction.type}
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <div className="transactions_Collapsed-Details">
                                    <label
                                        htmlFor="Category"
                                        className="transaction-value"
                                    >
                                        Category
                                    </label>
                                    <div className="transaction-input">
                                        <input
                                            className="transaction-input"
                                            type="text"
                                            id="Category"
                                            value={
                                                editableCategory !== ""
                                                    ? editableCategory
                                                    : transaction.category
                                            }
                                            onChange={(e) =>
                                                setEditableCategory(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <i
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSetEditableCategory(
                                                    transaction
                                                );
                                            }}
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                </div>
                                <div className="transactions_Collapsed-Details">
                                    <label
                                        htmlFor="Note"
                                        className="transaction-value"
                                    >
                                        Note
                                    </label>
                                    <div className="transaction-input">
                                        <input
                                            className="transaction-input"
                                            type="text"
                                            id="Note"
                                            value={
                                                editableNote !== ""
                                                    ? editableNote
                                                    : transaction.note
                                            }
                                            onChange={(e) =>
                                                setEditableNote(e.target.value)
                                            }
                                        />
                                        <i
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSetEditableNote(
                                                    transaction
                                                );
                                            }}
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AccountTransactions;
