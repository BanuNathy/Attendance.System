import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import homeImage from './images/home.png';
import classesImage from './images/classes.png';
import teachersImage from './images/teachers.png';
import studentImage from './images/students.png';
import dashboardImage from './images/dashboard.png';
import attendanceImage from './images/attendance.png';
import { FaBell, FaSignOutAlt, FaHome, FaTachometerAlt, FaChalkboardTeacher, FaUsers, FaClipboardList, FaUser } from 'react-icons/fa';

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const navigate = useNavigate(); 

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const messages = {
    Home: 'Welcome to the Home Page!',
    Dashboard: 'Welcome to the Dashboard!',
    Classes: 'Welcome to the Classes Section!',
    Teachers: 'Welcome to the Teachers Section!',
    Students: 'Welcome to the Students Section!',
    Attendance: 'Welcome to the Attendance Section!',
  };

  const images = {
    Home: homeImage,
    Dashboard: dashboardImage,
    Classes: classesImage,
    Teachers: teachersImage,
    Students: studentImage,
    Attendance: attendanceImage,
  };

  const menuItems = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Classes', icon: <FaChalkboardTeacher /> },
    { name: 'Teachers', icon: <FaUsers /> },
    { name: 'Students', icon: <FaUser /> },
    { name: 'Attendance', icon: <FaClipboardList /> },
  ];

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-left">
          <h1>Smart Attendance System</h1>
        </div>
        <div className="header-right">
          <FaBell className="icon" />
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </header>
      <div className="home-container">
        <div className="sidenav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} onClick={() => handleMenuClick(item.name)}>
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          <h1>{messages[selectedMenu]}</h1>
          <div className="image-container">
            <img src={images[selectedMenu]} alt={selectedMenu} className="main-image" />
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>2024 Smart Attendance System. All rights reserved. || Banu Kunasingam</p>
      </footer>
    </div>
  );
};

export default Home;


