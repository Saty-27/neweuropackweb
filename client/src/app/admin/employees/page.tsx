export default function EmployeesPage() {
  const mockEmployees = [
    { id: 1, name: 'John Doe', role: 'Employee', tasksCompleted: 45, warnings: 0, status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'SubAdmin', tasksCompleted: 120, warnings: 1, status: 'Active' },
    { id: 3, name: 'Bob Wilson', role: 'Employee', tasksCompleted: 12, warnings: 2, status: 'Warning' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Employee Management</h1>
        <button style={{ 
          background: 'var(--admin-primary)', 
          color: 'white', 
          border: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          + Add Employee
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--admin-bg)', borderBottom: '1px solid var(--admin-border)' }}>
            <tr>
              <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Tasks Completed</th>
              <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockEmployees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                <td style={{ padding: '1rem' }}>{emp.name}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    background: emp.role === 'SubAdmin' ? '#EBF8FF' : '#EDF2F7', 
                    color: emp.role === 'SubAdmin' ? '#3182CE' : '#4A5568',
                    borderRadius: '999px',
                    fontSize: '0.875rem'
                  }}>
                    {emp.role}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{emp.tasksCompleted}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ color: emp.warnings > 1 ? '#E53E3E' : '#38A169', fontWeight: 500 }}>
                    {emp.status} ({emp.warnings} Warnings)
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', border: '1px solid var(--admin-border)', background: 'white', borderRadius: '4px' }}>Edit</button>
                    <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', border: 'none', background: '#FEE2E2', color: '#DC2626', borderRadius: '4px' }}>Fire</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
