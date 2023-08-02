import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { Navbar, Footer } from "./index";
import { TransactionContext } from '../context/TransactionContext';

const MyWallet = () => {
    const { currentAccount } = useContext(TransactionContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [balanceOfAccount, setBalanceOfAccount] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(currentAccount);
            const balanceInEther = ethers.utils.formatEther(balance);
            setBalanceOfAccount(parseFloat(balanceInEther).toFixed(2));
        };
        fetchBalance();
    }, [currentAccount]);

    return (
        <div className="h-screen flex flex-col gradient-bg-transactions">
            <Navbar />
            <div className="flex-1 gradient-bg-transactions text-white p-12 md:p-12 py-12 px-4">
                <h3 className="text-white text-3xl text-center my-2">
                    My Wallet
                </h3>
                {user && (
                    <div className="flex flex-col items-center">
                        <img src={user.picture} alt="Avatar" className="w-32 h-32 rounded-full mb-4" />
                        <p className="text-lg">Name: {user.name}</p>
                        <p className="text-lg">Email: {user.email}</p>
                        <p className="text-lg">Address Wallet: {currentAccount}</p>
                        {balanceOfAccount !== null ? (
                            <p className="text-lg">Balance: {balanceOfAccount}</p>
                        ) : (
                            <p className="text-lg">Loading balance...</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default MyWallet;
