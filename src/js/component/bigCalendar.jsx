import React, { Component, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { Context } from "../store/appContext";
import { Calendar, momentLocalizer, DateLocalizer, Views } from 'react-big-calendar'
import PropTypes from 'prop-types'
import moment from "moment";
import { ContactlessTwoTone } from "@material-ui/icons";
import "/node_modules/react-big-calendar/lib/css/react-big-calendar.css";
//import '/node_modules/react-big-calendar/lib/sass/styles';
import "./bigCalendar.css";
require('moment/locale/es.js');

export const BigCalendar2 = (props) => {
    const urlUpdate = "/proyectos/updateCalendar";
    const { store, actions } = useContext(Context);
    const localizer = momentLocalizer(moment)


    //array de eventos
    const myEventsList = [
        {
            title: "Reuniones",
            start: new Date('2022-08-29 10:22:00'),
            end: new Date('2022-08-31 10:42:00')
        },
        {
            title: "Preparación Cumple",
            start: new Date('2022-08-31 12:22:00'),
            end: new Date('2022-09-08 00:01:00')
        },
        {
            title: "Inicio del día",
            start: new Date('2022-09-08 00:00:00'),
            end: new Date('2022-09-08 06:00:00')
        },
        {
            title: "Desayuno en Pan de Tata",
            start: new Date('2022-09-08 07:30:00'),
            end: new Date('2022-09-08 08:15:00')
        },
        {
            title: "Tiempo para compras extra",
            start: new Date('2022-09-08 16:00:00'),
            end: new Date('2022-09-08 17:30:00')
        },
        {
            title: "Celebración",
            start: new Date('2022-09-08 19:00:00'),
            end: new Date('2022-09-08 23:59:00')
        }
    ]
    const [eventosCalendario, setEventosCalendarios] = useState(myEventsList)

    const handleSelectSlot = useCallback(
        ({ start, end, id }) => {
            console.log(start, end)
            start = new Date(start)
            end = new Date(end)
            id = new Date().getTime()
            const title = window.prompt('Nombre del nuevo evento')
            if (title) {
                setEventosCalendarios((prev) => [...prev, { start, end, title, id }])
            }
        },
        [setEventosCalendarios])

    const handleSelectEvent = useCallback(
        (event) => {
            let desicion = window.prompt('Desea Eliminar este Evento [Y] ?');
            if (desicion == "Y") {
                //console.log(desicion)
                console.log(event)
                setEventosCalendarios((prevState) => prevState.filter((item, index) => {
                    //console.log(item.title.toLowerCase().trim() != event.title.toLowerCase().trim())
                    // 
                    if (item.id) {
                        return item.id != event.id;
                    } else {
                        return item.title.toLowerCase().trim() != event.title.toLowerCase().trim();
                    }

                }))
                alert("Recuerde Guardar Cambios")
            }
        },
        [])

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(2015, 3, 12),
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        [])

    useEffect(() => {
        //console.log(props.calendario)
        //console.log(props.calendario.length)
        if (props.calendario.length > 0) {
            for (let i = 0; i < props.calendario.length; i++) {
                //console.log(props.calendario[i]["start"])
                props.calendario[i]["start"] = new Date(props.calendario[i]["start"])
                props.calendario[i]["end"] = new Date(props.calendario[i]["end"])
            }
        }
        setEventosCalendarios(props.calendario)
        let botones = document.querySelectorAll("button")
        if (botones.length > 0) {
            for (let i = 0; i < botones.length; i++) {
                if (botones[i].classList.toString() == "" || botones[i].classList.toString() == "rbc-active") {
                    botones[i].classList.add("btn")
                    botones[i].classList.add("btn-outline-primary")
                    botones[i].style = "min-height: 35px; min-width: 20px;"
                    console.log(botones[i].classList.toString())
                    switch (botones[i].innerHTML) {
                        case "Today":
                            botones[i].innerHTML = "Hoy"
                            break;
                        case "Back":
                            botones[i].innerHTML = "Atrás"
                            break;
                        case "Next":
                            botones[i].innerHTML = "Siguiente"
                            break;
                        case "Month":
                            botones[i].innerHTML = "Mes"
                            break;
                        case "Day":
                            botones[i].innerHTML = "Día"
                            break;
                        case "Week":
                            botones[i].innerHTML = "Semana"
                            break;
                    }
                }
            }
        }
        let grupoBotones = document.querySelector(".rbc-btn-group")
        if (grupoBotones) {
            grupoBotones.style = "min-height: 35px;"
            document.querySelector(".rbc-toolbar").classList.add("d-flex")
            document.querySelector(".rbc-toolbar").classList.add("justify-content-between")
        }

    }, [])

    return (
        <>
            <Calendar
                localizer={localizer}
                events={eventosCalendario}
                startAccessor="start"
                defaultDate={new Date()}
                defaultView={"month"}
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                scrollToTime={scrollToTime}
                style={{ height: "75vh" }}
            />
            <div className="row py-2 my-1">
                <div align="right">
                    <button className="btn btn-outline-success"
                        onClick={async () => {
                            // setLayout(controlledBoard)
                            console.log(eventosCalendario) //controlled board es el correcto
                            let obj = {
                                Compania: store.user.JRCompaniaAut[0],
                                Nombre: props.nombre,
                                IDBaseDatos: props.id,
                                Calendar: eventosCalendario
                            }
                            let response = await actions.putGenerico(urlUpdate, obj)
                            if (response.ok) {
                                alert(await response.json())
                                //setRecarga(!recarga)
                            } else {
                                alert(await response.json())
                            }

                        }}>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    )

}
/* 
selectable.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
  } */