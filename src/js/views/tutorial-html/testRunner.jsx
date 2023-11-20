import React, { useState } from 'react';
import TerminalOutput from './terminalOutput.jsx';
import "./tutorial.css";

const TestRunner = () => {
    const [lsCommand, setLsCommand] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleCreateDirectory = async (endpoint) => {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:3002/commands/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([]),
            });

            const data = await response.json();
            if (response.ok) {
                setLsCommand(data.command)
            }
            console.log(data.message); // Mensaje del servidor
            setLoading(false)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setLoading(false)
        }
    };

    return (
        <div id="layout-tutorial">
            <div id="code" className='code'>
                <pre>
                    /* write your code here */
                </pre>
            </div>
            <div id="instructions" className='instructions'>
                <h2>Instrucciones</h2>
                <p>Aquí van las instrucciones para el ejercicio o proyecto.</p>
            </div>
            <div id="terminal" className='terminal'>
                <button onClick={() => handleCreateDirectory('ls-command')}>ls -l</button>
                <button onClick={() => handleCreateDirectory('test-1')}>test</button>
                {loading ? <div class="spinner-border text-primary"></div> : <></>}
                {lsCommand ?
                    <><TerminalOutput text={lsCommand} /></> :
                    <></>
                }
            </div>
        </div>
    );
};

export default TestRunner;
