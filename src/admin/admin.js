import {useEffect, useState, useRef} from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPES = process.env.REACT_APP_SCOPES;
console.log(CLIENT_ID)

function Admin() {
    const [data, setData] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const tokenClientRef = useRef(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const test = await getDocs(collection(db, 'resources'))
                setData(test.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                console.log(data)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (window.google) {
            tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (tokenResponse) => {
                if (tokenResponse.access_token) {
                    setAccessToken(tokenResponse.access_token);
                } else {
                    alert('Failed to get access token');
                }
                },
            });
        }
        fetchData();
    }, []);

    const handleSignIn = () => {
        if (tokenClientRef.current) {
        tokenClientRef.current.requestAccessToken();
        } else {
        alert('Google API not loaded yet');
        }
    };

    return (
        <div>
            <h1>Admin</h1>
            <p>Welcome to the admin panel!</p>
        <div>
        {!accessToken ? (
            <button onClick={handleSignIn}>Sign in with Google</button>
        ) : (
            <>
            <p>Authenticated and ready to upload!</p>
            </>
        )}
        </div>
        </div>
    );
}

export default Admin;
