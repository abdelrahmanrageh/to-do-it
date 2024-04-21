import './App.css';
import './Tasks.css';
import './Edit-task.css';
import Input from './components/HandlingTasks';
import Navbar from './components/Navbar';

function App() {
    
    return (
        <>
            <div className='App'>
                <Navbar />
                <div className='container'>
                    <div className='date'>
                        <h2>Welcome</h2>
                        <h6>{new Date().toLocaleDateString(undefined,
                            {weekday: 'long', day: 'numeric', month: 'long' , hour12: true  })}
                        </h6>
                    </div>
                    <Input />
                    <footer></footer>
                </div>
            </div >
        </>
    );
}

export default App;
