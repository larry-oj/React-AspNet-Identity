import './App.css';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
        <p>xd</p>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/login'}>Login</Link></li>
        </ul>
      <Outlet />
    </div>
  );
}