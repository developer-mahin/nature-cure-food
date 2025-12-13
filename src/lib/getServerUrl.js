const getServerUrl = () => { 
    return process.env.NEXT_PUBLIC_BACKEND_URL;
};

export default getServerUrl;