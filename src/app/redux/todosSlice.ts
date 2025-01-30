import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "@/server-actions/task.actions";
import { Task } from "../domain/entities/Task";



interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await getAllTasks();
  if ("error" in response) {
    throw new Error(response.error);
  }
  return response.tasks;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (data: { title: string; description?: string }) => {
    const response = await createTask(data);
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response.task;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({
    id,
    data,
  }: {
    id: string;
    data: { title?: string; description?: string; isCompleted?: boolean };
  }) => {
    const response = await updateTask(id, data);
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response.updatedTask;
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id: string) => {
    const response = await deleteTask(id);
    if ("error" in response) {
      throw new Error(response.error);
    }
    return response.deletedTask;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add task";
      })
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete task";
      });
  },
});

export const { actions: tasksActions, reducer: tasksReducer } = tasksSlice;

export default tasksSlice.reducer;
