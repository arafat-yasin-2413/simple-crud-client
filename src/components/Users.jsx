import React, { use } from "react";

const Users = ({usersPromise}) => {

    const initialUsers = use(usersPromise);
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
                alert('user added successfully');
                e.target.reset();
            }
        })
    }

	return (
		<div>
			<h2>This is users Page</h2>

			<div>
				{/* add user form */}
				<form onSubmit={handleAddUser}>
                    <input type="text" placeholder="your name" name="name" id="" /> <br />
                    <input type="email" placeholder="your email" name="email" id="" /> <br /> 
                    <input type="submit"  value="Add User" id="" />
				</form>
			</div>
		</div>
	);
};

export default Users;
