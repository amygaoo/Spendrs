import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import '../../styles/settings.css';
import '../../styles/home.css';
import { userLinks, users } from "../../constants";
import { ButtonGroup, ToggleButton} from "react-bootstrap";
import { Link } from 'react-router-dom';
function Settings() {
  let user = users["alexshih2018"]
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Private', value: '1' },
    { name: 'Friends Only', value: '2' },
    { name: 'Public', value: '3' },
  ];
  return (
    <div className = "home">
      <div className='settingsContainer'>
      <Navbar links={userLinks} />
      <h3 className = "headers"> Profile Information</h3>
      <div id = "users" className="list-group-item">
                <Link to={`/profile`}>
                    <h5 className="mb-">{user.name}</h5>
                </Link>
                <p className="mb-1">Username: @{user.username}</p>
                <p className="mb-1">Email: {user.email}</p>
                <p className="mb-1">Date Registered: {user.register_date}</p>
                {/* <Button onClick={() => props.handleDelete(user.username)} className="btn-default" id = "deleteButton"> Delete user</Button> */}
        </div>
        <h3 className = "headers">Preferences</h3>
        <div className="list-group-item">
          <h5> Post Privacy </h5>
          <h7> Who can see your posts: </h7>
            <ButtonGroup toggle className = "selectionButtons">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  type="radio" 
                  variant="light"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                  id = "selectionButtons"
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          
        </div>
      </div>
    </div>
    
  );
}

export default Settings;