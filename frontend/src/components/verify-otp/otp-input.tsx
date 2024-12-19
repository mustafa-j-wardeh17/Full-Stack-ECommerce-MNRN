import React, { useState } from 'react';

interface OTPInputProps {
    setOtp: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const OTPInput = ({ setOtp }: OTPInputProps) => {
    const [otp, setOtpState] = useState(Array(6).fill(""));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const digits = value.replace(/[^0-9]/g, ""); // Allow only digits
        const newOtp = [...otp];

        if (digits.length > 0) {
            let currentIndex = index;
            for (const digit of digits) {
                if (currentIndex < newOtp.length) {
                    newOtp[currentIndex] = digit;
                    currentIndex++;
                }
            }
        }

        setOtpState(newOtp);
        setOtp(parseInt(newOtp.join(''), 10)); // Set the OTP value to the parent component

        if (index < otp.length - 1 && digits.length > 0) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "") {
            if (index > 0) {
                const previousInput = document.getElementById(`otp-${index - 1}`);
                if (previousInput) {
                    previousInput.focus();
                }
            }
        } else if (e.key === "Backspace" && otp[index] !== "") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtpState(newOtp);
        }
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="otp" className="text-primary font-bold mb-2">
                OTP Code
            </label>
            <div className="flex gap-2">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1} // maxLength is 1, because each input should only hold one digit
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center text-lg uppercase border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                ))}
            </div>
        </div>
    );
};

export default OTPInput;
