import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      setUsername(decoded.username); 
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='bg-white rounded-lg p-5'>
      <div className='flex justify-around'>
        <AccountCircleIcon fontSize='large' color='primary' />
        <h1 className='ml-2 text-xl'>{username ? username : 'Guest'}</h1>
      </div>
      <div className='m-5'>
        <Button variant="contained" onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  );
}
