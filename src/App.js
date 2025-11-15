import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);           
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);    
  const [editingId, setEditingId] = useState(null); 
  const [editText, setEditText] = useState('');     

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      alert('Error loading todos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const addTodo = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      alert('Please enter a todo!');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text: inputValue, completed: false }])
        .select();
      
      if (error) throw error;
      
      setTodos([...data, ...todos]); 
      setInputValue('');              
    } catch (error) {
      console.error('Error adding todo:', error.message);
      alert('Error adding todo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const toggleComplete = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  
  const saveTodoEdit = async (id) => {
    if (!editText.trim()) {
      alert('Todo cannot be empty!');
      return;
    }

    try {
      const { error } = await supabase
        .from('todos')
        .update({ text: editText })
        .eq('id', id);
      
      if (error) throw error;
      
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };
  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📝 My To-do App</h1>
      </header>

      <main className="container">
        {/* Form to add new to-dos */}
        <form onSubmit={addTodo} className="form">
          <input
            type="text"
            placeholder="Add a new to-do..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="input"
          />
          <button type="submit" disabled={loading} className="btn-add">
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-value">{todos.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{todos.filter(t => t.completed).length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{todos.filter(t => !t.completed).length}</span>
          </div>
        </div>

        {/* To-do list */}
        <div className="todos">
          {loading && todos.length === 0 ? (
            <p className="loading">Loading to-dos...</p>
          ) : todos.length === 0 ? (
            <p className="empty">No to-dos yet! Add one to get started 🚀</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                  className="checkbox"
                />

                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                ) : (
                  <span className="todo-text">{todo.text}</span>
                )}

                <div className="actions">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveTodoEdit(todo.id)}
                        className="btn-save"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(todo.id);
                          setEditText(todo.text);
                        }}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
