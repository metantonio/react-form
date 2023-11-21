import React, { useState, useRef } from 'react';
import TerminalOutput from './terminalOutput.jsx';
import "./tutorial.css";


const TestRunner = () => {
    const [lsCommand, setLsCommand] = useState(false);
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });


    const BASE_URL = process.env.BASE_URL2;

    const handleCreateDirectory = async (endpoint) => {
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/commands/${endpoint}`, {
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

    const handleContextMenu = (e) => {
        e.preventDefault();

        const selected = textareaRef.current.value.substring(textareaRef.current.selectionStart, textareaRef.current.selectionEnd);
        setSelectedText(selected);

        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        setContextMenuVisible(true);

        // Posiciona el menú contextual en la posición del clic derecho
        if (document.getElementById('contextMenu')) {
            document.getElementById('contextMenu').style.top = `${e.clientY}px`;
            document.getElementById('contextMenu').style.left = `${e.clientX}px`;
        }
        // Cierra el menú contextual después de hacer clic en cualquier lugar
        document.addEventListener('click', handleOutsideClick);
    };

    const handleOutsideClick = () => {
        setContextMenuVisible(false);
        setSelectedText('');
        document.removeEventListener('click', handleOutsideClick);
    };

    const formatAsHtml = () => {
        // Implementa la lógica para dar formato como HTML según tus necesidades
        const formattedText = `<code>${selectedText}</code>`;

        // Reemplaza el texto seleccionado en el textarea
        const newText = textareaRef.current.value.substring(0, textareaRef.current.selectionStart) +
            formattedText +
            textareaRef.current.value.substring(textareaRef.current.selectionEnd);

        // Actualiza el valor del textarea
        textareaRef.current.value = newText;

        // Oculta el menú contextual
        setContextMenuVisible(false);
        setSelectedText('');
    };

    return (
        <div id="layout-tutorial">
            <div id="pre">
                <code>
                    <textarea
                        ref={textareaRef}
                        id="code"
                        className="code"
                        placeholder="/* write your code here */"
                        onContextMenu={handleContextMenu}
                    />
                </code>
            </div>
            {contextMenuVisible && (
                <div id="contextMenu" style={{ position: 'absolute', zIndex: 999 }}>
                    <div onClick={formatAsHtml}>Formato HTML</div>
                </div>
            )}
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
