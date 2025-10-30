import {useEffect, useState} from 'react';

function Admin() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);
    const [itemImages, setItemImages] = useState({});
    const [itemPdfs, setItemPdfs] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [deletedItems, setDeletedItems] = useState([]);
    const [htitle, setHtitle] = useState('');


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
        formData.append('description', description);
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
                setDescription('');
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
            setSelectedItems(data.filter(item => item.selected).map(item => item.id));
            console.log('Selected items:', selectedItems);

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

    const fetchHomeScreenTitle = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/title`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch home screen title');
            const data = await res.json();
            setHtitle(data.title);
        } catch (err) {
            console.error('Error fetching home screen title:', err);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchHomeScreenTitle();
    }, []);

    const handleApplyChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/items/private`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    selected: selectedItems,
                    deleted: deletedItems
                })
            });
            if (!res.ok) throw new Error('Failed to apply changes');
            const data = await res.json();
            console.log('Changes applied:', data);
            fetchItems();
        } catch (err) {
            console.error('Error applying changes:', err);
            setMessage('Failed to apply changes.');
        }
    }

    const handleApplyHChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_URL}/title`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title: htitle })
            });
            if (!res.ok) throw new Error('Failed to apply home screen title changes');
            const data = await res.json();
            console.log('Home screen title updated:', data);
        } catch (err) {
            console.error('Error updating home screen title:', err);
            setMessage('Failed to update home screen title.');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-400 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">Admin</h1>
            <p className="mb-6 text-purple-700">Welcome to the admin panel!</p>
            <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <label className="font-semibold text-purple-700">
                    Home Screen Title
                    <input
                        type="text"
                        value={htitle}
                        onChange={e => setHtitle(e.target.value)}
                        className='mt-1 block w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400'
                        required
                    />
                </label>
                <button
                    onClick={handleApplyHChanges}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Apply Changes
                </button>
            </form>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-4 my-8"
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
                    Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
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
                <h2 className="text-2xl font-bold text-purple-800 mb-4">All Resources</h2>
                {items.length === 0 ? (
                    <p className="text-purple-700">No items uploaded yet.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="border-b border-purple-200 pb-4 mb-4">
                            <h3 className="text-purple-800 font-semibold">{item.title}</h3>
                            <p className="text-purple-600">{item.description}</p>
                            <div className="mt-2">
                                <img
                                    src={itemImages[item.id] || ''}
                                    alt={`Image for ${item.title}`}
                                    className="rounded shadow"
                                />
                            </div>
                            <div className="mt-2 flex flex-row gap-2 items-center justify-between">
                                <a
                                    href={itemPdfs[item.id] || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded inline-block"
                                >
                                    View PDF
                                </a>
                                <button
                                    className={`px-3 py-1 rounded font-semibold ${
                                        selectedItems.includes(item.id)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-purple-300 text-purple-800'
                                    }`}
                                    onClick={() => {
                                        setSelectedItems(prev =>
                                            prev.includes(item.id)
                                                ? prev.filter(id => id !== item.id)
                                                : [...prev, item.id]
                                        );
                                        setDeletedItems(prev => prev.filter(id => id !== item.id));
                                        console.log('Selected items:', selectedItems);
                                    }}
                                >
                                    {selectedItems.includes(item.id) ? 'Selected' : 'Select'}
                                </button>
                                <button
                                    className={`px-3 py-1 rounded font-semibold ${
                                        deletedItems.includes(item.id)
                                            ? 'bg-red-500 text-white'
                                            : 'bg-purple-100 text-purple-800'
                                    }`}
                                    onClick={() => {
                                        setDeletedItems(prev =>
                                            prev.includes(item.id)
                                                ? prev.filter(id => id !== item.id)
                                                : [...prev, item.id]
                                        );
                                        setSelectedItems(prev =>
                                            prev.filter(id => id !== item.id)
                                        );
                                        console.log('deleted items:', deletedItems);
                                        console.log('Selected items after deletion:', selectedItems);
                                    }}
                                >
                                    {deletedItems.includes(item.id) ? 'Deleted' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <button
                    onClick={handleApplyChanges}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Apply Changes
                </button>
            </div>
        </div>
    );
}

export default Admin;
