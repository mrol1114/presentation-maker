import React from 'react';
import Toolbar from '../toolbar/Toolbar';
import SlidesGroup from '../slidesGroup/SlidesGroup';
import Workboard from '../workboard/Workboard';
import ControlPanel from '../controlPanel/ControlPanel';
import './App.css';

function App() {
    return (
        <div className = "App">
            <div>
                <ControlPanel />
                <Toolbar />
            </div>
            
            <div>
                <SlidesGroup />
                <Workboard />
            </div>
        </div>
    );
}

export default App;