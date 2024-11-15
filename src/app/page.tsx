"use client";
import { useState } from "react";

type todo = {
  title: string;
  description: string;
  date: Date;
};
export default function Home() {
  const [todo, setTodo] = useState<todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const addTodo = () => {
    const newTodo = {
      title: title,
      description: description,
      date: new Date(),
    };
    setTodo([...todo, newTodo]);
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      <div className="flex my-16 items-center justify-center gap-6">
        <input
          type="text"
          placeholder="title"
          className="border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          className="border"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="border rounded" onClick={addTodo}>
          Add todo
        </button>
      </div>
      <div className="flex justify-center gap-4">
        <h1>Todo List: </h1>
        <table className="border ">
          <thead className="border">
            <tr>
              <td className="border">title</td>
              <td className="border">description</td>
              <td className="border">date</td>
              <td className="border">delete</td>
            </tr>
          </thead>
          {todo.map((todo, index) => (
            <tbody key={index}>
              <tr key={index}>
                <td className="border">{todo.title}</td>
                <td className="border">{todo.description}</td>
                <td className="border">{todo.date.toISOString()}</td>
                <td className="border hover:bg-gray-400 rounded-full">
                  <button>delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
