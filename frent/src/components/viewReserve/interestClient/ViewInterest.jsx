import React, { useEffect, useState } from 'react';
import { getLikeClient, getClient } from '../../../api/register.api';

export default function ViewInterest() {
    const [likesClient, setLikesClient] = useState([]);
    const [currentClientID, setCurrentClientID] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const client = await getClient();
                console.log("Este es el id del cliente", client.id)
                const clientID = client.id; 
                setCurrentClientID(clientID);

                const res = await getLikeClient(clientID);
                setLikesClient(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    console.log(likesClient);

    return (
        <div>
            <h1>Intereses del cliente</h1>
            <ul>
                {likesClient && likesClient.map((like, index) => (
                    <li key={index}>
                        Cliente {like.user_id}: Like {like.like_id}
                    </li>
                ))}
            </ul>
        </div>
    );
}
