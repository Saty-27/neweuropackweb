'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
  assignedTo: User;
  assignedBy: User;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [taskRes, userRes] = await Promise.all([
        fetchAPI('/tasks'),
        fetchAPI('/users')
      ]);
      if (taskRes.success) setTasks(taskRes.data);
      if (userRes.success) setUsers(userRes.data);
    } catch (error) {
      console.error('Failed to load tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetchAPI('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description, assignedTo, deadline, priority })
      });
      if (res.success) {
        setShowForm(false);
        setTitle('');
        setDescription('');
        setAssignedTo('');
        setDeadline('');
        setPriority('Medium');
        loadData();
      }
    } catch (error) {
      alert('Failed to create task');
    } finally {
      setFormLoading(false);
    }
  };

  const updateTaskStatus = async (id: string, newStatus: string) => {
    try {
      await fetchAPI(`/tasks/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      loadData();
    } catch (error) {
      alert('Failed to update task status');
    }
  };

  const getPriorityIcon = (p: string) => {
    if (p === 'High') return '🔥';
    if (p === 'Medium') return '⚡';
    return '💤';
  };

  const columns = ['Not Started', 'In Progress', 'Completed', 'Overdue'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Tasks Board (EMS)</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Assign and track employee tasks.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ background: showForm ? '#718096' : 'var(--admin-primary)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {showForm ? 'Cancel' : '+ Assign Task'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Create New Task</h2>
          <form onSubmit={handleCreateTask} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Task Title *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--admin-border)', borderRadius: '4px' }} />
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description *</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--admin-border)', borderRadius: '4px' }}></textarea>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Assign To *</label>
              <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--admin-border)', borderRadius: '4px', background: 'white' }}>
                <option value="">Select Employee</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--admin-border)', borderRadius: '4px', background: 'white' }}>
                <option value="High">High 🔥</option>
                <option value="Medium" selected>Medium ⚡</option>
                <option value="Low">Low 💤</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Deadline *</label>
              <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} required style={{ width: '100%', maxWidth: '300px', padding: '0.75rem', border: '1px solid var(--admin-border)', borderRadius: '4px' }} />
            </div>

            <button type="submit" disabled={formLoading} style={{ gridColumn: '1 / -1', background: 'var(--admin-primary)', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: formLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold', width: '200px' }}>
              {formLoading ? 'Assigning...' : 'Assign Task'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading tasks...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {columns.map(col => (
            <div key={col} style={{ background: '#F7FAFC', borderRadius: '8px', padding: '1rem', minHeight: '500px' }}>
              <h3 style={{ 
                fontSize: '1rem', 
                marginBottom: '1rem', 
                display: 'flex', 
                justifyContent: 'space-between',
                color: col === 'Overdue' ? '#E53E3E' : col === 'Completed' ? '#38A169' : 'var(--admin-text)'
              }}>
                {col} 
                <span style={{ background: 'white', padding: '0.1rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                  {tasks.filter(t => t.status === col).length}
                </span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.filter(t => t.status === col).map(task => (
                  <div key={task._id} style={{ background: 'white', padding: '1rem', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: col === 'Overdue' ? '1px solid #FC8181' : '1px solid transparent' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: task.priority === 'High' ? '#E53E3E' : 'var(--admin-text-muted)' }}>
                        {getPriorityIcon(task.priority)} {task.priority}
                      </span>
                      {col !== 'Completed' && (
                        <select 
                          value={task.status} 
                          onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                          style={{ fontSize: '0.75rem', padding: '0.1rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
                        >
                          {columns.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      )}
                    </div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{task.title}</h4>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--admin-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {task.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', borderTop: '1px solid var(--admin-border)', paddingTop: '0.5rem' }}>
                      <span style={{ background: '#E2E8F0', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#4A5568', fontWeight: 600 }}>
                        {task.assignedTo?.name?.split(' ')[0] || 'Unknown'}
                      </span>
                      <span style={{ color: new Date(task.deadline) < new Date() && col !== 'Completed' ? '#E53E3E' : 'var(--admin-text-muted)' }}>
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
