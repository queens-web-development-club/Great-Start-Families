import {useEffect, useState} from 'react';

function Admin() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);
    const [itemImages, setItemImages] = useState({});
    const [itemPdfs, setItemPdfs] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (image?.type !== 'image/png') {
            setMessage('Image must be a PNG file.');
            setLoading(false);
            return;
        }

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
        fetchItems();
        setLoading(false);
    };

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/items/private`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch items');
            const data = await res.json();
            console.log('Fetched items:', data);
            setItems(data);
            data.forEach(item => {
                fetchItemImage(item.id);
                fetchItemPdf(item.id);
            });
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    };

    const fetchItemImage = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/item/private/${itemId}/image`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch item image');
            const blob = await res.blob();
            setItemImages(prev => ({ ...prev, [itemId]: URL.createObjectURL(blob) }));
        } catch (err) {
            console.error(`Error fetching image for item ${itemId}:`, err);
        }
    };

    const fetchItemPdf = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/item/private/${itemId}/pdf`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch item PDF');
            const blob = await res.blob();
            setItemPdfs(prev => ({ ...prev, [itemId]: URL.createObjectURL(blob) }));
        } catch (err) {
            console.error(`Error fetching PDF for item ${itemId}:`, err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-400 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">Admin</h1>
            <p className="mb-6 text-purple-700">Welcome to the admin panel!</p>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-4 mb-8"
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
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold text-purple-800 mb-4">All Uploads</h2>
                {items.length === 0 ? (
                    <p className="text-purple-700">No items uploaded yet.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="border-b border-purple-200 pb-4 mb-4">
                            <h3 className="text-purple-800 font-semibold">{item.title}</h3>
                            <div className="mt-2">
                                <img
                                    src={itemImages[item.id] || ''}
                                    alt={`Image for ${item.title}`}
                                    className="rounded shadow"
                                />
                            </div>
                            <div className="mt-2">
                                <a
                                    href={itemPdfs[item.id] || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded inline-block"
                                >
                                    View PDF
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Admin;
