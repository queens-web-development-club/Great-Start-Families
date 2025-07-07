import {useEffect, useState} from 'react';

function Admin() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('title', title);
        if (image) formData.append('image', image);
        if (pdf) formData.append('pdf', pdf);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (res.ok) {
                setMessage('Upload successful!');
                setTitle('');
                setImage(null);
                setPdf(null);
            } else {
                setMessage('Upload failed.');
            }
        } catch (err) {
            setMessage('An error occurred.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-400 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">Admin</h1>
            <p className="mb-6 text-purple-700">Welcome to the admin panel!</p>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
            >
                <label className="font-semibold text-purple-700">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />
                </label>
                <label className="font-semibold text-purple-700">
                    Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                        className="mt-1 block w-full text-purple-700"
                        required
                    />
                </label>
                <label className="font-semibold text-purple-700">
                    PDF
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={e => setPdf(e.target.files[0])}
                        className="mt-1 block w-full text-purple-700"
                        required
                    />
                </label>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {message && (
                    <div className="text-center text-purple-800 font-medium mt-2">{message}</div>
                )}
            </form>
        </div>
    );
}

export default Admin;
