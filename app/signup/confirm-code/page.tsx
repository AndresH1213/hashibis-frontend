'use client';

import Button from '@/components/common/Button';
import { ExpiredCodeError } from '@/constants/errors';
import Notification from '@/lib/notification';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import VerificationInput from 'react-verification-input';

const ConfirmEmail = () => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState('');

  const route = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedEmail = urlParams.get('email');
    if (!encodedEmail) {
      return route.push('/');
    }
    const email = decodeURIComponent(encodedEmail);
    setEmail(email);
  }, []);

  useEffect(() => {
    const confirmCodeIsFill = Boolean(confirmationCode.length === 6);
    setIsButtonDisabled(!confirmCodeIsFill);
  }, [confirmationCode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsButtonDisabled(true);
    const data = await fetch('/api/auth/signup/confirm-code', {
      method: 'POST',
      body: JSON.stringify({ email, code: confirmationCode }),
    });
    setIsButtonDisabled(false);
    if (data.status === 200) {
      const successCodeNotification = new Notification({
        message: 'Verification Sent Successfully',
        type: 'success',
      });
      successCodeNotification.notificate();
      setConfirmationCode('');
      route.push('/');
      return;
    }

    const response = await data.json();
    const failedCodeNotification = new Notification({
      message: response.message,
      type: 'error',
    });
    failedCodeNotification.notificate();
    setConfirmationCode('');
  };

  const requestCodeAgain = async () => {
    const encodedEmail = encodeURI(email);
    const data = await fetch(
      `/api/auth/signup/confirm-code?email=${encodedEmail}`,
      {
        method: 'GET',
      }
    );
    const respose = await data.json();
    const notification = new Notification({
      message: respose.message,
      type: data.status === 200 ? 'success' : 'warning',
    });
    notification.notificate();
  };

  const handleChange = (value: string) => {
    setConfirmationCode(value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mx-auto max-h-screen h-96"
    >
      <div className="flexCenter flex-col space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Check your Email</h2>
          <p>We've sent a six­ digit confirmation code there</p>
        </div>

        <VerificationInput
          length={6}
          value={confirmationCode}
          placeholder="·"
          validChars="0-9"
          autoFocus={true}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mt-4 space-x-4 flexCenter">
        <Button
          title="Confirm Email"
          bgColor="bg-green-200"
          submitting={isButtonDisabled}
          type="submit"
        />
        <Button
          title="Resend"
          bgColor="bg-green-100"
          textColor="black"
          leftIcon="/dot.svg"
          handleClick={() => requestCodeAgain()}
        />
      </div>
    </form>
  );
};

export default ConfirmEmail;
