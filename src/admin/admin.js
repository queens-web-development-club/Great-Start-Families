import {useEffect, useState} from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Admin() {
    const [data, setData] = useState([]);

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

        fetchData();
    }, []);

    return (
        <div>
        <h1>Admin</h1>
        <p>Welcome to the admin panel!</p>
        <ul>
            {data.map((item) => (
                <li key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </li>
            ))}
        </ul>
        </div>
    );
}

export default Admin;
