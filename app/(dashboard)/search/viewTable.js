import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../components/axiosInstance';  

const SearchComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the Axios instance to make a GET request
        const response = await axiosInstance.get('search', {
          params: {
            word: 'delivery',
          },
        });
        setData(response.data);
        console.log(data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
<div>
      <h1>Search Results</h1>
      {data.length > 0 ? (
        <div>
            <p>Items Found: {data[0]}</p>
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Field Name</th>
                <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {data.map((doc, index) => doc.document_id && (
                <tr key={index}>
                    <td>{doc.document_id.$oid}</td>
                    <td>{doc.field_name}</td>
                    <td>{doc.value}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default SearchComponent;
