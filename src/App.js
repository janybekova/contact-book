import React, {useState,useEffect } from 'react';
import ContactsList from "./component/ContactsList";
import Header from "./component/Header";
import axios from 'axios'
import AddForm from "./component/AddForm";

const App = () => {
    const [search,setSearch] = useState('')
    const [contacts,setContacts] = useState([])
    const [isShowform, setIsShowForm] = useState(false)
    useEffect(() =>{
        axios ('https://607618ea0baf7c0017fa78a5.mockapi.io/users')
            .then(({data}) => setContacts (data))
    }, [])

    const deleteUser = (id) => {
        axios.delete (`https://607618ea0baf7c0017fa78a5.mockapi.io/users/${id}`)
            .then(({data}) => {
                setContacts(contacts.filter(el => el.id !== data.id))
            })
    }
    const addUser = (user) => {
        axios.post ('https://607618ea0baf7c0017fa78a5.mockapi.io/users', user)
            .then(({data}) => setContacts([...contacts,data]))

    }

    return (
        <div className="w-1/3 mx-auto my-6">
            <Header  setSearch={setSearch} setIsShowForm={setIsShowForm}/>
            { isShowform && <AddForm addUser={addUser} setIsShowForm={setIsShowForm}/>}
            <ContactsList
                search={search}
                contacts={contacts}
                onDelete={deleteUser}
            />
        </div>
    );
};

export default App;