import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {useLocation} from "react-router-dom";


// <UploadWidget onUpload={(url: string) => setProfileUrl(url)} /> is the general flow of how we could this, to set the User.profileUrl to the user

interface UploadWidgetProps {
    onUpload: (url: string) => void;
}

export const UploadWidget = ({ onUpload }: UploadWidgetProps) => {
    const location = useLocation();
    const buttonClass = location.pathname === '/profile'
        ? 'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500'
        : 'rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-white/20';

    const cloudinaryRef = useRef<typeof window.cloudinary>();
    const widgetRef = useRef<any>();
    const [buttonText, setButtonText] = useState<string>('Profile Picture');

    useEffect(() => {
        // Ensure Cloudinary is loaded in the window object
        if (!window.cloudinary) {
            console.error('Cloudinary SDK not loaded');
            return;
        }

        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'nimbus-capstone',
                uploadPreset: 'xohgc3hx',
                maxFiles: 1
            },
            (error: Error | null, result: { event: string; info: { secure_url: string } }) => {
                if (error) {
                    console.error('Upload error:', error);
                    return;
                }
                if (result.event === 'success') {
                    onUpload(result.info.secure_url);
                    setButtonText('Uploaded!');
                }
            }
        );
    }, [onUpload]);

    return (
        <div className="flex flex-col items-center gap-4 rounded-sm">
            <button
                type="button"
                onClick={() => widgetRef.current?.open()}
                className={buttonClass}
            >
                {buttonText}
            </button>
        </div>
    );
};