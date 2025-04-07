import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
function App() {
	return (
		<div className='dark:bg-black font-mono'>
			<Router>
				<Routes>
					<Route path='/' Component={Home} />
					<Route path='/signup' Component={Signup} />
					<Route path='/login' Component={Login} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
