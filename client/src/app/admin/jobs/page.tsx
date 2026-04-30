'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { Plus, Edit, Trash2, Briefcase, MapPin, Clock, Eye, EyeOff, Settings } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  active: boolean;
  createdAt: string;
}

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [settings, setSettings] = useState<{ visible: boolean }>({ visible: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [jobsRes, settingsRes] = await Promise.all([
        fetchAPI('/jobs'),
        fetchAPI('/jobs/settings')
      ]);
      if (jobsRes.success) setJobs(jobsRes.jobs);
      if (settingsRes.success) setSettings(settingsRes.settings);
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return;
    try {
      await fetchAPI(`/jobs/${id}`, { method: 'DELETE' });
      loadData();
    } catch {
      alert('Failed to delete job.');
    }
  };

  const toggleVisibility = async () => {
    try {
      const res = await fetchAPI('/jobs/settings/update', {
        method: 'PUT',
        body: JSON.stringify({ visible: !settings.visible })
      });
      if (res.success) setSettings(res.settings);
    } catch {
      alert('Failed to update settings.');
    }
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Job Architect</h1>
          <p className="text-slate-500 font-medium">Manage your open positions and recruitment status</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={toggleVisibility}
            className={`admin-btn-outline flex items-center gap-2 ${settings.visible ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 'text-slate-400 border-slate-100 bg-slate-50'}`}
          >
            {settings.visible ? <Eye size={18} /> : <EyeOff size={18} />}
            Hiring: {settings.visible ? 'Enabled' : 'Disabled'}
          </button>
          <Link href="/admin/jobs/create" className="admin-btn-primary flex items-center gap-2 no-underline">
            <Plus size={18} /> Post New Role
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="animate-pulse font-bold tracking-widest uppercase text-xs">Accessing Talent Matrix...</div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="admin-card py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Briefcase size={32} />
          </div>
          <p className="text-slate-500 text-lg font-bold mb-6">No jobs posted yet.</p>
          <Link href="/admin/jobs/create" className="admin-btn-outline no-underline">
            Create Your First Job Posting
          </Link>
        </div>
      ) : (
        <div className="admin-card p-0 overflow-hidden border-slate-100 shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/50 border-bottom border-slate-100">
              <tr>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Details</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex flex-col">
                       <span className="font-bold text-slate-900">{job.title}</span>
                       <span className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mt-1">{job.type}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {job.department}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <MapPin size={14} className="text-slate-300" />
                      {job.location}
                    </div>
                  </td>
                  <td className="p-5">
                     <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                       job.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                     }`}>
                       {job.active ? 'Active' : 'Hidden'}
                     </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link 
                        href={`/admin/jobs/edit/${job._id}`}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#FF6600] hover:border-[#FF6600] hover:shadow-lg transition-all no-underline"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(job._id)} 
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-300 hover:text-red-500 hover:border-red-200 hover:shadow-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
