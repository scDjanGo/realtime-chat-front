"use client"


import { useEffect } from "react";

const SERVER_URL = `wss://realtime-chat-vne1.onrender.com/notifications`


function useNotifications () {
    useEffect(() => {
        const ws = new WebSocket(SERVER_URL)


        ws.onopen = () => {
            console.log("Notifications connected")
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
        }


        return () => ws.close()

    }, [])
}


export {useNotifications}