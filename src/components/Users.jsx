import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({usersPromise}) => {

    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);

    console.log(initialUsers);

    const handleAddUser=(e)=>{
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;

        const newUser = {name, email};
        console.log(newUser);

        // 1. create user in the database
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data => {
            console.log('data after creating user in the db : ',data);
            if(data.insertedId) {

                newUser._id = data._id;
                const newUsers = [...users, newUser];
                setUsers(newUsers);

                alert('user added successfully');
                e.target.reset();
            }
        })
    }

    const handleUserDelete = (id) => {
        console.log('delete this user', id);

        fetch(`http://localhost:3000/users/${id}`, {

            method: 'DELETE',

        })
        .then(res=>res.json())
        .then(data => {

            if(data.deletedCount) {
                const remainingUsers = users.filter(user=> user._id !== id);
                setUsers(remainingUsers);
                console.log('after delete : ', data);
            }


        })
    }

	return (
		<div>
			<h2>This is users Page</h2>

			<div>
				{/* add user form */}
                <h4>Total Users : {users.length}</h4>
				<form onSubmit={handleAddUser}>
                    <input type="text" placeholder="your name" name="name" id="" /> <br />
                    <input type="email" placeholder="your email" name="email" id="" /> <br /> 
                    <input type="submit"  value="Add User" id="" />
				</form>
			</div>


            {/* showing users */}
            <div>
                {
                    users.map((user,index)=> 
                        <p key={index}>
                            {user.name} : 
                            {user.email}
                            <Link to={`/users/${user._id}`}>Details</Link>
                            <button onClick={ ()=>{  handleUserDelete(user._id)}}>X</button>
                            </p>
                    )
                }
            </div>
		</div>
	);
};

export default Users;
