"use client";
import { useState } from "react";
import { useAccount, useSignMessage, useVerifyMessage } from "wagmi";
export default function TestSign() {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const obj = {
    name: "test",
    age: 20,
  };
  const message = JSON.stringify(obj);
  const [signature, setSignature] = useState<
    `0x${string}` | Uint8Array | undefined
  >(undefined);
  const handleSign = async () => {
    const result = await signMessageAsync({
      message,
    });
    console.log(result);
    setSignature(result);
  };
  const handleVerify = async () => {
    const result = await fetch("/api/sig", {
      method: "POST",
      body: JSON.stringify({
        address,
        message,
        signature,
      }),
    });
    console.log(result);
  };
  return (
    <div className="flex space-x-3">
      <button className="border p-2 rounded-md" onClick={handleSign}>
        Sign eth transaction
      </button>

      {signature ? (
        <>
          <button className="border p-2 rounded-md" onClick={handleVerify}>
            Sign on server
          </button>
          <VerifyButton
            address={address}
            message={message}
            signature={signature}
          />
        </>
      ) : null}
    </div>
  );
}

const VerifyButton = ({
  address,
  message,
  signature,
}: {
  address: `0x${string}` | undefined;
  message: string;
  signature: `0x${string}` | Uint8Array | undefined;
}) => {
  console.log(address, message, signature);
  const { data, error } = useVerifyMessage({
    address,
    message,
    signature,
  });
  return (
    <button className="border p-2 rounded-md">
      Verify eth signature [{data}]
    </button>
  );
};
