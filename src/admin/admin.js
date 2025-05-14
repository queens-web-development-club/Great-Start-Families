import { useEffect, useState, useRef } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; 
const SCOPES = process.env.REACT_APP_SCOPES;
const FOLDER_ID = process.env.REACT_APP_FOLDER_ID;

function Admin() {
    const [accessToken, setAccessToken] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const tokenClientRef = useRef(null);

    useEffect(() => {
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
    }, []);

    const handleSignIn = () => {
        if (tokenClientRef.current) {
        tokenClientRef.current.requestAccessToken();
        } else {
        alert('Google API not loaded yet');
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // Upload file to Drive in the target folder
            const metadata = {
                name: file.name,
                parents: [FOLDER_ID],
            };

            const form = new FormData();
            form.append(
                'metadata',
                new Blob([JSON.stringify(metadata)], { type: 'application/json' })
            );
            form.append('file', file);

            const uploadResponse = await fetch(
                'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',
                {
                    method: 'POST',
                    headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
                    body: form,
                }
            );

            const uploadData = await uploadResponse.json();
            console.log('Upload response:', uploadData);

            if (uploadData.id) {
                // Make the file public
                await fetch(
                `https://www.googleapis.com/drive/v3/files/${uploadData.id}/permissions`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            role: 'reader',
                            type: 'anyone',
                        }),
                    }
                );

                // Generate public link
                const publicLink = `https://lh3.googleusercontent.com/d/${uploadData.id}`;
                setUploadedFiles((prev) => [...prev, { name: uploadData.name, link: publicLink, type: file.type }]);
                console.log(uploadedFiles)
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error(error);
            alert('Upload error');
        }
    };

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleSignIn}>Sign in to Google Drive</button>
        
      ) : (
        <>
          <h3>Upload Image or PDF:</h3>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} />

          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
                <li key={index} style={{ marginBottom: '20px' }}>
                {file.type.startsWith('image/') ? (
                    <img src={file.link} alt={file.name} style={{ maxWidth: '300px', border: '1px solid #ccc' }} />
                ) : file.type === 'application/pdf' ? (
                    <embed src={file.link} type="application/pdf" width="300" height="400" />
                ) : (
                    <a href={file.link} target="_blank" rel="noopener noreferrer">
                    Open File
                    </a>
                )}
                </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Admin;
