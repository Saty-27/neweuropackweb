export default function ERPPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>ERP & Advanced Analytics</h1>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Business intelligence and heatmap tracking insights.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Conversion Funnel Analytics (Advanced Mock)</h2>
          <div style={{ flex: 1, background: '#EDF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0' }}>
            [ Graph: Traffic → Quote Requested → Quote Status Pipeline ]
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🤖 AI Insights
          </h2>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--admin-text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
            <li><strong style={{ color: 'var(--admin-text)' }}>&quot;Custom Boxes&quot;</strong> are trending this week with a 45% increase in searches.</li>
            <li>Conversion rate dropped by 0.5% today. Suggest reaching out to pending quotes faster.</li>
            <li>Bounce rate is high on the &quot;About Us&quot; page on mobile devices.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
