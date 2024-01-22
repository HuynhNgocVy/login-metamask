import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";

function Home() {
    const [ result, setResult ] = useState()
    const handleRegister = async () => {
        try {
            if(!window.ethereum) return "Install MetaMask"
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const walletAddress = await signer.getAddress();
            console.log("wallet", walletAddress)
            const nonceResponse = await fetch('https://rapid-striped-advantage.glitch.me/api/metamask/login', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({walletAddress})
            });
            const {nonce} = await nonceResponse.json();
            console.log("nonce", nonce)
            const signature = await signer.signMessage(nonce);
            const loginResponse = await fetch('https://rapid-striped-advantage.glitch.me/api/metamask/verify', {
              method: 'Post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({walletAddress, signature})
            });
            const {token} = await loginResponse.json();
            
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: walletAddress, token }),
              });
            const data = await response.json();
            alert(data.message)              
        } catch (error) {
          console.error('Error registering with MetaMask:', error);
        }
    };
    const handleLogin = async () => {
        try {
            if(!window.ethereum) return "Install MetaMask"
            const accounts = await window.ethereum.send(
                "eth_requestAccounts"
            )
            const address = accounts.result[0];
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
              });
            const data = await response.json();
            setResult(data.address)           
        } catch (error) {
          console.error('Error registering with MetaMask:', error);
        }
    }
  return (
    <div className='flex justify-center items-center flex-col h-screen font-sans'>
        <button className='bg-orange-500 text-white px-6 py-2 rounded-lg mb-3' onClick={handleRegister}>Sign up with Metamask</button>
        <button className='bg-blue-500 text-white px-6 py-2 rounded-lg mb-3' onClick={handleLogin}>Log in with Metamask</button>
        {result && <p>Address: {result}</p>}
    </div>
  )
}

export default Home