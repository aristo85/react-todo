import { FC, FormEvent, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../todoApi";
import { Checkbox, FormControlLabel } from "@mui/material";
import styles from "./TodoList.module.scss";
import { Todo } from "../types";

const TodoList: FC = () => {
  const [newTodo, setNewTodo] = useState("");

  const { data: todos, isLoading, isSuccess } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //addTodo
    try {
      await addTodo({ todo: newTodo, completed: false }).unwrap();
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
    setNewTodo("");
  };

  const handleUpdate = async (updatedData: Partial<Todo>) => {
    try {
      await updateTodo(updatedData).unwrap();
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const handleDelete = async (todoToDelete: Todo) => {
    try {
      await deleteTodo(todoToDelete).unwrap();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button className="submit">
          <UploadIcon />
        </button>
      </form>

      <div className={styles.listItem}>
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess ? (
          todos.length < 1 ? (
            <p>No tasks to display</p>
          ) : (
            todos?.map((el) => (
              <div className={styles.item} key={el.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(_, value) =>
                        handleUpdate({ ...el, completed: value })
                      }
                      checked={el.completed}
                    />
                  }
                  label={el.todo}
                />
                <DeleteSharpIcon
                  className={styles.trashIcon}
                  sx={{ fontSize: 30, color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(el)}
                />
              </div>
            ))
          )
        ) : (
          <p>Something went wrong</p>
        )}
      </div>
    </>
  );
};

export default TodoList;
