import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    
    const user = useLoaderData();
    // console.log('user details : ', user);


    const handleUpdateUser = (e) => {
        e.preventDefault(); 

        const name = e.target.name.value;
        const email = e.target.email;
    }
    




    return (
        <div>
            <h2>Update User Page</h2>

            <form onSubmit={handleUpdateUser}>

                <input type="text" name="name" placeholder='your updated name' defaultValue={user.name} id="" /> <br />
                <input type="email" name="email" placeholder='your new email' defaultValue={user.email} id="" /> <br />
                <input type="submit" value="Update User" />

            </form>

        </div>
    );
};

export default UpdateUser;