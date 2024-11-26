"use client";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

type todo = {
  title: string;
  status: string;
  id: string;
};
export default function Home() {
  const [todo, setTodo] = useState<todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [empty, setEmpty] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  //const [status, setStatus] = useState<string>("Pending");
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      const todos = JSON.parse(todosString);
      setTodo(todos);
    }
  }, []);
  const addTodo = () => {
    if (title) {
      const newTodo = {
        title: title,
        status: "Pending",
        id: title,
      };
      const updatedTodos = [...todo, newTodo];
      setTodo(updatedTodos);
      setTitle("");
      // Update the local storage with the new array
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      setEmpty(true);
    }
  };

  const updateTodo = (idd) => {
    const currentItemIndex = todo.findIndex((t) => t.id == idd);
    todo[currentItemIndex].setIsEditable(true);
  };

  const handleStatus = (idd: string) => {
    const currentItemIndex = todo.findIndex((t) => t.id == idd);
    const updatedTodo = [...todo];
    updatedTodo[currentItemIndex] = {
      ...updatedTodo[currentItemIndex],
      status: "Completed",
    };
    setTodo(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  };

  const closeTodo = (idd: string) => {
    const currentItemIndex = todo.findIndex((t) => t.id == idd);
    const afterDeletedTodo = [
      ...todo.slice(0, currentItemIndex),
      ...todo.slice(currentItemIndex + 1),
    ];
    setTodo(afterDeletedTodo);
    localStorage.setItem("todos", JSON.stringify(afterDeletedTodo));
  };
  return (
    <div className="mx-8 my-8 mt-8 mb-8 bg-purple-50 pb-6 rounded-lg">
      {completed && (
        <dialog
          className="fixed top-2 right-2 bg-green-600 px-5 py-2 font-semibold text-white rounded-lg"
          open
        >
          Task completed!
        </dialog>
      )}
      <p className=" flex justify-center mx-auto rounded-t-lg bg-purple-400 pt-6 font-semibold text-white text-3xl pb-24">
        TODO List
      </p>

      <div className="flex rounded-lg -mt-16 sm:mx-8 shadow-md bg-stone-50 py-8 flex-col items-center mx-4 my-4 mb-4 justify-center gap-2">
        <input
          type="text"
          required={true}
          placeholder="What would you like to do?"
          className="border-b-2 outline-none w-56 text-lg border-gray-400 bg-stone-50"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (title) setEmpty(false);
          }}
        />
        <p className="text-red-400">{empty ? "Enter Something!" : ""}</p>
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
                className="flex justify-between items-center px-6 shadow-sm py-5"
              >
                <td className="w-1/2 overflow-x-scroll flex items-center gap-3">
                  {todo.title}{" "}
                  <button
                    onClick={() => {
                      updateTodo(todo.id);
                    }}
                  >
                    {" "}
                    <FaPencilAlt size={15} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleStatus(todo.id);
                      // alert("Task completed!");
                      setCompleted(true);
                      setTimeout(() => {
                        setCompleted(false);
                      }, 3000);
                    }}
                    disabled={todo.status == "Completed" ? true : false}
                    className={`-ml-10  ${
                      todo.status != "Completed"
                        ? "bg-yellow-400 hover:scale-105 hover:bg-yellow-500"
                        : "text-teal-600"
                    } transition duration-300 font-semibold text-white px-3 py-1 rounded-md`}
                  >
                    {todo.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      closeTodo(todo.id);
                    }}
                    className="text-red-500 -ml-6 hover:text-red-600 hover:scale-105 transition duration-300 shadow-lg"
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
