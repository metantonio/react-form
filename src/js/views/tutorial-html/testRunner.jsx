import React, { useState, useRef } from 'react';
import TerminalOutput from './terminalOutput.jsx';
import InstructionsViewer from './instructionsViewer.jsx';
import "./tutorial.css";


const TestRunner = () => {
    const [lsCommand, setLsCommand] = useState(false);
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [formattedHtml, setFormattedHtml] = useState('');
    const [tutorialLesson, setTutorialLesson] = useState(0)


    const BASE_URL = process.env.BASE_URL2;

    function build() {
        // Abre una nueva ventana con un mensaje
        window.open('', '_blank').document.write(textareaRef.current.value);
    }

    const nextLesson = () => {
        setTutorialLesson(prev => prev + 1)
    }

    const previousLesson = () => {
        if (tutorialLesson > 0) {
            setTutorialLesson(prev => prev - 1)
        }
    }

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
        // Posiciona el menú contextual en la posición del clic derecho
        setFormattedHtml(`<pre style="margin: 0; padding: 8px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; white-space: pre-wrap;">${selected}</pre>`);
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
        const formattedText = `<pre style="margin: 0; padding: 8px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; white-space: pre-wrap;">${textareaRef.current.value.substring(0, textareaRef.current.selectionStart)}</pre>`;

        // Reemplaza el texto seleccionado en el textarea
        const newText = formattedText +
            textareaRef.current.value.substring(textareaRef.current.selectionEnd);

        // Actualiza el valor del textarea
        textareaRef.current.value = newText;

        // Oculta el menú contextual
        setContextMenuVisible(false);
        setSelectedText('');
        setFormattedHtml(newText)
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
                <div id="contextMenu" style={{ position: 'absolute', top: formattedHtml ? '100px' : '0', left: '100px', zIndex: 999 }}>
                    {formattedHtml && (
                        <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
                    )}
                    <div onClick={formatAsHtml}>Formato HTML</div>
                </div>
            )}
            <div id="instructions" className='instructions'>
                <div className='column d-flex'>
                    <h3>Instrucciones</h3>
                    {tutorialLesson != 0 ? <button className='btn btn-primary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { previousLesson() }}>Anterior</button> : <></>}
                    <button className='btn btn-primary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { nextLesson() }}>Siguiente</button>
                    {tutorialLesson != 0 ? <button className='btn btn-success btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => handleCreateDirectory(`test/${tutorialLesson}`)}>Check</button> : <></>}
                    {loading ? <div class="spinner-border text-primary"></div> : <></>}
                    <button className='btn btn-secondary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { build() }}>Build Site</button>
                </div>

                <InstructionsViewer documentPath={`${BASE_URL}/tutorial-html/${tutorialLesson}`} />
            </div>
            <div id="terminal" className='terminal'>
                <h4>Console</h4>
                <button onClick={() => handleCreateDirectory('ls-command')}>ls -l</button>

                {lsCommand ?
                    <><TerminalOutput text={lsCommand} /></> :
                    <></>
                }
            </div>
        </div>
    );
};

export default TestRunner;
