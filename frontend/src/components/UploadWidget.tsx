import { useEffect, useRef, useState } from 'react';

// <UploadWidget onUpload={(url: string) => setProfileUrl(url)} /> is the general flow of how we could this, to set the User.profileUrl to the user

interface UploadWidgetProps {
    onUpload: (url: string) => void;
}

export const UploadWidget = ({ onUpload }: UploadWidgetProps) => {
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
        <div className="flex flex-col items-center gap-4">
            <button
                type="button"
                onClick={() => widgetRef.current?.open()}
                className="bg-white text-black rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
            >
                {buttonText}
            </button>
        </div>
    );
};