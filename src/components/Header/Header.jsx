import React from 'react';
import './Header.css';
import Typography from '@mui/material/Typography';

function Header() {
    return (
        <header className="banner-header">
            <Typography variant="h1" gutterBottom>My Shopping List</Typography>
        </header>
    );
}

export default Header;
