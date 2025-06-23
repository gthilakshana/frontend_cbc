import { useState } from "react"
import "./testing.css"

export default function Testing() {

    const [count, setCount] = useState(0)
    const [name, setName] = useState("Student")

    function increment() {
        setCount(count + 1)

    }

    function decrement() {
        setCount(count - 1)
        console.log("decrement")
    }

    function changeName(value) {
        setName(value)

    }


    return (
        <div className="background">
            <h1 className="text" >{name}</h1>
            <button className="val" onClick={decrement}>-</button>
            <span> {count} </span>
            <button className="val" onClick={increment}>+</button>
            <div className="buttonPanel">
                <button onClick={() => changeName("Student")}>Student</button>
                <button onClick={() => changeName("Teacher")}>Teacher</button>
                <button onClick={() => changeName("Admin")}>Admin</button>
            </div>
        </div>
    )
}