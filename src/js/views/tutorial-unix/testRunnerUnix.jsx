import React, { useState, useRef } from 'react';
import TerminalOutput from './terminalOutput.jsx';
import InstructionsViewer from './instructionsViewer.jsx';
import styles from "./tutorialunix.module.css";
import Swal from 'sweetalert2';


const TestRunnerUnix = () => {
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

    const nextLesson = () => {
        setTutorialLesson(prev => prev + 1)
        textareaRef.current.value = ''
    }

    const previousLesson = () => {
        if (tutorialLesson > 0) {
            setTutorialLesson(prev => prev - 1)
            textareaRef.current.value = ''
        }
    }

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        // Aquí puedes realizar otras acciones relacionadas con el cambio de lenguaje si es necesario
    };

    const handleCreateDirectory = async (endpoint) => {
        let obj = { data: textareaRef.current.value, lesson: tutorialLesson }
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

    const handleKeyDown = (event) => {
        // Verifica si la tecla presionada es Enter (código 13)
        if (event.keyCode === 13 && tutorialLesson != 0) {
            event.preventDefault(); //avoid the break line \n predetermined by textarea tag
            handleCreateDirectory(`unix-commands`);
            /* setLsCommand(''); */
            textareaRef.current.value = ""
        }
    };

    const formatAsHtml = () => {
        // Implementa la lógica para dar formato como HTML según tus necesidades
        let formattedText = `<pre style="margin: 0; padding: 8px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; white-space: pre-wrap;">${textareaRef.current.value.substring(0, textareaRef.current.selectionStart)}</pre>`;

        // Reemplaza el texto seleccionado en el textarea
        let newText = formattedText +
            textareaRef.current.value.substring(textareaRef.current.selectionEnd);

        // Actualiza el valor del textarea
        textareaRef.current.value = newText;

        // Oculta el menú contextual
        setContextMenuVisible(false);
        setSelectedText('');
        setFormattedHtml(newText)
    };

    return (
        <div className={styles.layouttutorial}>
            <div className={styles.console}>
                <code>
                    <textarea
                        ref={textareaRef}
                        className={styles.code}
                        placeholder="/* write your commands here */"
                        onContextMenu={handleContextMenu}
                        onKeyDown={handleKeyDown}
                    />
                </code>
            </div>
            {contextMenuVisible && (
                <div id="contextMenu" style={{ position: 'absolute', top: formattedHtml ? '100px' : '0', left: '100px', zIndex: 999 }}>
                    {formattedHtml && (
                        <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
                    )}
                    <div onClick={formatAsHtml}>{selectedLanguage=='es'?'Formato HTML':'HTML Format'}</div>
                </div>
            )}
            <div className={styles.instructions}>
                <div className='column d-flex'>
                    <h3>{selectedLanguage=='es'?'Instrucciones':'Instructions'}</h3>
                    <div className='mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }}>
                        <label htmlFor="languageDropdown"></label>
                        <select id="languageDropdown" onChange={handleLanguageChange} value={selectedLanguage}>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            {/* Agrega más opciones de idioma según sea necesario */}
                        </select>

                        {/* Puedes mostrar el lenguaje seleccionado en la interfaz si es necesario */}
                    </div>
                    {tutorialLesson != 0 ? <button className='btn btn-primary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { previousLesson() }}>{selectedLanguage=='es'?'Anterior':'Previous'}</button> : <></>}
                    <button className='btn btn-primary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { nextLesson() }}>{selectedLanguage=='es'?'Siguiente':'Next'}</button>
                    {/* {tutorialLesson != 0 ? <button className='btn btn-success btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => handleCreateDirectory(`unix/${tutorialLesson}`)}>Check</button> : <></>} */}
                    {loading ? <div class="spinner-border text-primary"></div> : <></>}
                    {/* <button className='btn btn-secondary btn-sm mx-2' style={{ marginY: ".25rem", paddingX: ".5rem", fontSize: ".75rem" }} onClick={() => { build() }}>Build Site</button> */}
                </div>

                <InstructionsViewer documentPath={`${BASE_URL}/tutorial-unix/${selectedLanguage=="es"?'':"en/"}${tutorialLesson}`} />
            </div>
            <div className={styles.terminal}>
                <h4>Console</h4>
                {/* <button onClick={() => handleCreateDirectory('ls-command')}>ls -l</button> */}

                {lsCommand ?
                    <><TerminalOutput text={lsCommand} /></> :
                    <></>
                }
            </div>
        </div>
    );
};

export default TestRunnerUnix;
