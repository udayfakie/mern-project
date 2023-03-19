import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import styled from "styled-components";

const Data = () => {
  const API = "http://localhost:3001";
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Axios.get(`${API}/users`).then(res => {
      
      setUsers(res.data);
      console.log(users);
    });
  }, []);

  const CreateUser = () => {
    if (name && age && email) {
      try {
        Axios.post(`${API}/createUser`, { name, age, email });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <INPUT
        type="text "
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <INPUT
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <INPUT
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <BUTTON onClick={CreateUser}> Create User</BUTTON>
      {users.map(({ _id, name, age, email }) => {
        return (
          <DisplayItems key={_id}>
            <Ul>
              <LI>Name: {name}</LI>
              <LI>Age: {age}</LI>
              <LI>Email: {email}</LI>
            </Ul>
          </DisplayItems>
        );
      })}
    </Container>
  );
};

export default Data;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  flex-direction: column;
`;

const BUTTON = styled.button`
  background-color: black;
  color: white;
  font-size: 25px;
`;
const DisplayItems = styled.div`
  background-color: black;
  color: #fff;
  width: 400px;
  height: auto;
  display: flex;
  justify-content: center;
  margin: 10px;
  border-radius: 15px;
`;
const INPUT = styled.input`
  font-size: 20px;
  margin: 7px;
  border-radius: 6px;
`;
const Ul = styled.ul`
  flex-direction: column;
  display: flex;
  align-items: center;
`;
const LI = styled.li`
  margin: 3px;
  list-style-type: none;
  font-weight: 700;
  font-size: 1.2rem;
`;
