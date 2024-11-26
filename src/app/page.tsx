"use client";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

type todo = {
  title: string;
  status: string;
  id: string;
};
export default function Home() {
  const [todo, setTodo] = useState<todo[]>([]);
  const [title, setTitle] = useState<string>("");
  //const [status, setStatus] = useState<string>("Pending");

  const addTodo = () => {
    const newTodo = {
      title: title,
      status: "Pending",
      id: title,
    };
    setTodo([...todo, newTodo]);
    setTitle("");
  };

  const handleStatus = (idd: string) => {
    const currentItemIndex = todo.findIndex((t) => t.id == idd);
    const updatedTodo = [...todo];
    updatedTodo[currentItemIndex] = {
      ...updatedTodo[currentItemIndex],
      status: "Completed",
    };
    setTodo(updatedTodo);
  };

  const closeTodo = (idd: string) => {
    const currentItemIndex = todo.findIndex((t) => t.id == idd);
    const afterDeletedTodo = [
      ...todo.slice(0, currentItemIndex),
      ...todo.slice(currentItemIndex + 1),
    ];
    setTodo(afterDeletedTodo);
  };
  return (
    <div className="mx-8 my-8 mt-8 mb-8 bg-purple-50 pb-6 rounded-lg">
      <p className=" flex justify-center mx-auto rounded-t-lg bg-purple-400 pt-6 font-semibold text-white text-3xl pb-24">
        TODO List
      </p>

      <div className="flex rounded-lg -mt-16 sm:mx-8 shadow-md bg-stone-50 py-8 flex-col items-center mx-4 my-4 mb-4 justify-center gap-2">
        <input
          type="text"
          placeholder="What would you like to do?"
          className="border-b-2 outline-none w-56 text-lg border-gray-400 bg-stone-50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="border rounded-md hover:bg-red-500 hover:scale-105 transition duration-300 bg-red-400 text-white px-6 py-2 font-semibold shadow-lg shadow-red-200"
          onClick={addTodo}
        >
          Add todo
        </button>
      </div>

      <div className="mx-4 my-4 shadow-md sm:mx-8 bg-stone-50 py-6 rounded-lg">
        <table className="flex flex-col">
          <thead className="bg-stone-100">
            <tr className="flex justify-between px-6 py-3">
              <td className="w-1/2">List</td>
              <td>Status</td>
              <td>Close</td>
            </tr>
          </thead>
          {todo.map((todo, index) => (
            <tbody key={index}>
              <tr
                key={index}
                className="flex justify-between px-6 shadow-sm py-5"
              >
                <td className="w-1/2 overflow-x-scroll">{todo.title}</td>
                <td>
                  <button
                    onClick={() => {
                      handleStatus(todo.id);
                    }}
                    className="bg-teal-600 hover:bg-teal-700 hover:scale-105 transition duration-300 font-semibold text-white px-2 py-1 rounded-md"
                  >
                    {todo.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      closeTodo(todo.id);
                    }}
                    className="text-red-500 hover:text-red-600 hover:scale-105 transition duration-300 shadow-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
