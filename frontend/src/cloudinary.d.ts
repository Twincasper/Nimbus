declare global {
    interface Window {
        cloudinary: {
            createUploadWidget: (
                options: {
                    cloudName: string;
                    uploadPreset: string;
                    maxFiles?: number;
                },
                callback: (error: Error | null, result: any) => void
            ) => any;
        };
    }
}

export {};