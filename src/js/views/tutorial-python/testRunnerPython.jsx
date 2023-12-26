import React, { useState, useRef } from 'react';
import TerminalOutput from './terminalOutput.jsx';
import InstructionsViewer from './instructionsViewer.jsx';
import "./tutorial.module.css";
import Swal from 'sweetalert2';


const TestRunnerPython = () => {
    const [lsCommand, setLsCommand] = useState(false);
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [formattedHtml, setFormattedHtml] = useState('');
    const [tutorialLesson, setTutorialLesson] = useState(0)
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const BASE_URL = process.env.BASE_URL2;

    function build() {
        // Abre una nueva ventana con un mensaje
        window.open('', '_blank').document.write(textareaRef.current.value);
    }

    function runCode() {
        try {
            let codeToRun = textareaRef.current.value;
            let consoleLogOutput = '';

            // Intercepta console.log para capturar la salida
            const originalConsoleLog = console.log;
            console.log = (message) => {
                consoleLogOutput += `${message}\n`;
            };
            new Function(codeToRun)();
            // Restaura console.log a su estado original
            console.log = originalConsoleLog;

            setLsCommand(prev => `${prev}\n${consoleLogOutput}`);
        } catch (error) {
            console.error('Error running code:', error);
            //setLsCommand(null); // Puedes establecer un valor predeterminado o manejarlo de acuerdo a tus necesidades
        }
    }

    const nextLesson = () => {
        setTutorialLesson(prev => prev + 1)
    }

    const previousLesson = () => {
        if (tutorialLesson > 0) {
            setTutorialLesson(prev => prev - 1)
        }
    }

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        // Aquí puedes realizar otras acciones relacionadas con el cambio de lenguaje si es necesario
    };

    const handleCreateDirectory = async (endpoint) => {
        let obj = { data: textareaRef.current.value }
        try {
            setLoading(true)
            let response = await fetch(`${BASE_URL}/commands/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            let data = await response.json();
            if (response.ok) {
                setLsCommand(data.command)
            }
            if (data.correct) {
                Swal.fire({ text: "Correct!", icon: "success" });
            } else {
                Swal.fire({ text: "Wrong!", icon: "error" });
            }
            console.log(data.message); // Mensaje del servidor
            setLoading(false)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setLoading(false)
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();

            // Agregar un espacio o múltiples espacios en blanco
            const { selectionStart, selectionEnd, value } = event.target;
            const nuevaLinea = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);

            setSelectedText(nuevaLinea);

            // Mover el cursor después de la tabulación
            const nuevoCursor = selectionStart + 4;
            event.target.setSelectionRange(nuevoCursor, nuevoCursor);
        }
        /* if (event.key === 'Enter') {
            let lines = selectedText.split('\n');
            let highlightedLines = lines.split('\n')
                .map(line => (line.trim().startsWith('#') ? `## ${line} ##` : line))
                .join('\n');
            setSelectedText(highlightedLines);
        } */
    };

    const handleContextMenu = (e) => {
        e.preventDefault();

        let selected = textareaRef.current.value.substring(textareaRef.current.selectionStart, textareaRef.current.selectionEnd);
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
        //let formattedText = `<pre style="margin: 0; padding: 8px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; white-space: pre-wrap;">${textareaRef.current.value.substring(0, textareaRef.current.selectionStart)}</pre>`;
        let formattedText = `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Title on tab</title>
          </head>
          <body>
            <div>Hello World</div>
          </body>
        </html>
        `
        // Reemplaza el texto seleccionado en el textarea
        //let newText = formattedText + textareaRef.current.value.substring(textareaRef.current.selectionEnd);
        let newText = formattedText

        // Actualiza el valor del textarea
        textareaRef.current.value = newText;

        // Oculta el menú contextual
        setContextMenuVisible(false);
        setSelectedText(newText);
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
                        placeholder="# Write your code here"
                        onContextMenu={handleContextMenu}
                        onKeyDown={handleKeyDown}
                        value={selectedText}
                        onChange={(e) => setSelectedText(e.target.value)}
                    />
                </code>
            </div>
            {contextMenuVisible && (
                <div id="contextMenu" style={{ position: 'absolute', top: formattedHtml ? '100px' : '0', left: '100px', zIndex: 999 }}>
                    {formattedHtml && (
                        <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
                    )}
                    <div onClick={formatAsHtml}>{selectedLanguage == 'es' ? 'Formato HTML' : 'HTML Format'}</div>
                </div>
            )}
            <div id="instructions" className='instructions'>
                <div className='column d-flex'>
                    <h3>{selectedLanguage == 'es' ? 'Instrucciones' : 'Instructions'}</h3>
                    <div className='mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }}>
                        <label htmlFor="languageDropdown"></label>
                        <select id="languageDropdown" onChange={handleLanguageChange} value={selectedLanguage}>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            {/* Agrega más opciones de idioma según sea necesario */}
                        </select>

                        {/* Puedes mostrar el lenguaje seleccionado en la interfaz si es necesario */}
                    </div>
                    {tutorialLesson != 0 ? <button className='btn btn-primary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { previousLesson() }}>{selectedLanguage == 'es' ? 'Anterior' : 'Previous'}</button> : <></>}
                    <button className='btn btn-primary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { nextLesson() }}>{selectedLanguage == 'es' ? 'Siguiente' : 'Next'}</button>
                    {tutorialLesson != 0 ? <button className='btn btn-success btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => handleCreateDirectory(`test-python/${tutorialLesson}`)}>Run Code</button> : <></>}
                    {loading ? <div class="spinner-border text-primary"></div> : <></>}
                    {/* <button className='btn btn-secondary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { build() }}>Build Site</button> */}
                    {/* <button className='btn btn-secondary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { runCode() }}>Run code</button> */}
                </div>

                <InstructionsViewer documentPath={`${BASE_URL}/tutorial-python/${selectedLanguage == "es" ? '' : "en/"}${tutorialLesson}`} />
            </div>
            <div id="terminal" className='terminal'>
                <h4>Console</h4>
                {/* <button onClick={() => handleCreateDirectory('ls-command')}>ls -l</button> */}
                <button onClick={() => setLsCommand('')}>clear</button>
                {lsCommand ?
                    <><TerminalOutput text={lsCommand} /></> :
                    <></>
                }
            </div>
        </div>
    );
};

export default TestRunnerPython;
