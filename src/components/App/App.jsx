import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import  TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';


function App() {
    const [shoppingList, setShoppingList] = useState([]);

    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');

    function getList() {
        axios.get('/api/list').then((response) => {
            console.log('List', response.data);
            setShoppingList(response.data);
        }).catch((error) => {
            console.log('Error in GET', error);
            alert('Something went wrong');
          })
    };
    useEffect(() => {
        getList();
      }, []);
    
    function postList(e) {
        e.preventDefault();
        const data = {name: item, quantity: quantity, unit: unit}
        setItem('');
        setQuantity('');
        setUnit('');
        axios.post('/api/list', data)
            .then((response) => {
                getList();
        }).catch((error) => {
            console.log('Error in POST', error);
            alert('Something went wrong')
            })
    };

    function markPurchased(id) {
        axios.put(`/api/list/update/${id}`).then((response) => {
            getList();
          }).catch((error) => {
            console.log(error);
            alert('Something went wrong')
          })
    }

    function removeItem(id) {
        axios.delete(`/api/list/remove/${id}`).then((response) => {
            getList();
          }).catch((error) => {
            console.log(error);
            alert('Something went wrong')
          })
    }

    function resetList() {
        axios.put(`/api/list/reset`).then((response) => {
            getList();
          }).catch((error) => {
            console.log(error);
            alert('Something went wrong')
          })
    }

    function clearList() {
        axios.delete(`/api/list/clear`).then((response) => {
            getList();
          }).catch((error) => {
            console.log(error);
            alert('Something went wrong')
          })
    }

    return (
        <div className="App">
            <Header />
            <main>
                <h2>Add an item</h2>
                <form onSubmit={postList}>
                    Item:<TextField size="small" variant="filled" type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
                    Quantity:<TextField size="small" variant="filled" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    Unit:<TextField size="small" variant="filled" type="text" value={unit} onChange={(e) => setUnit(e.target.value)}/>
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
                <h2>Shopping List</h2>
                <button onClick={() => resetList()}>Reset</button>
                <button onClick={() => clearList()}>Clear</button>
                <div id="listSection">
                {
                    shoppingList.map((item) => {
                        return <Card variant="outlined" className='listItem' key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.quantity} {item.unit}</p>
                            { item.purchased ? 
                            <p>Purchased</p>:
                            <div>
                            <button className="buybtn" onClick={() => markPurchased(item.id)}>Buy</button>
                            <button className="removebtn" onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                            }
                        </Card>
                    })
                }
                </div>
            </main>
        </div>
    );
}

export default App;
