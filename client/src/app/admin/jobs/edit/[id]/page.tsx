'use client';

import { useState, useEffect, use } from 'react';
import { fetchAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [requirements, setRequirements] = useState<string[]>(['']);
  
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Mumbai, MH',
    type: 'Full-Time',
    experience: '',
    description: '',
    fullDescription: '',
    active: true,
    order: 0
  });

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const res = await fetchAPI(`/jobs/${id}`);
      if (res.success) {
        setFormData({
          title: res.job.title,
          department: res.job.department,
          location: res.job.location,
          type: res.job.type,
          experience: res.job.experience,
          description: res.job.description,
          fullDescription: res.job.fullDescription,
          active: res.job.active,
          order: res.job.order || 0
        });
        setRequirements(res.job.requirements?.length ? res.job.requirements : ['']);
      }
    } catch (error) {
      console.error('Error loading job', error);
      alert('Failed to load job details.');
    } finally {
      setFetching(false);
    }
  };

  const handleAddRequirement = () => setRequirements([...requirements, '']);
  const handleRemoveRequirement = (index: number) => {
    const newReqs = requirements.filter((_, i) => i !== index);
    setRequirements(newReqs.length ? newReqs : ['']);
  };
  const handleRequirementChange = (index: number, value: string) => {
    const newReqs = [...requirements];
    newReqs[index] = value;
    setRequirements(newReqs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchAPI(`/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...formData,
          requirements: requirements.filter(r => r.trim() !== '')
        })
      });
      if (res.success) {
        router.push('/admin/jobs');
      }
    } catch (error) {
      alert('Failed to update job listing.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-20 text-slate-400">
        <div className="animate-pulse font-bold tracking-widest uppercase text-xs">Loading Job Data...</div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/admin/jobs" className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Role</h1>
          <p className="text-slate-500 font-medium">Update "{formData.title}" details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="admin-card p-10 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Title</label>
              <input 
                type="text" 
                required
                className="admin-input text-xl font-bold"
                placeholder="e.g. Senior Packaging Architect"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience Required</label>
                <input 
                  type="text" 
                  required
                  className="admin-input"
                  placeholder="e.g. 5+ Years"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employment Type</label>
                <select 
                  className="admin-input"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Short Summary (Preview)</label>
              <textarea 
                required
                rows={3}
                className="admin-input"
                placeholder="Briefly describe the role for the list view..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Role Description</label>
              <textarea 
                required
                rows={6}
                className="admin-input"
                placeholder="Detailed explanation of responsibilities and impact..."
                value={formData.fullDescription}
                onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
              />
            </div>
          </div>

          <div className="admin-card p-10 space-y-8">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Requirements</label>
              <button 
                type="button"
                onClick={handleAddRequirement}
                className="text-[#FF6600] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <Plus size={14} /> Add Requirement
              </button>
            </div>
            <div className="space-y-4">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-3">
                  <input 
                    type="text"
                    className="admin-input"
                    placeholder={`Requirement #${idx + 1}`}
                    value={req}
                    onChange={(e) => handleRequirementChange(idx, e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => handleRemoveRequirement(idx)}
                    className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="admin-card p-10 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
              <select 
                className="admin-input"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Sales & BD">Sales & BD</option>
                <option value="Logistics">Logistics</option>
                <option value="Administration">Administration</option>
                <option value="IT & Tech">IT & Tech</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
              <input 
                type="text" 
                required
                className="admin-input"
                placeholder="e.g. Mumbai, MH"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Order</label>
              <input 
                type="number" 
                className="admin-input"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
              />
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <input 
                 type="checkbox"
                 id="active"
                 checked={formData.active}
                 onChange={(e) => setFormData({...formData, active: e.target.checked})}
                 className="w-5 h-5 rounded accent-[#FF6600]"
               />
               <label htmlFor="active" className="text-sm font-bold text-slate-700 cursor-pointer">Post Live Immediately</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-[#FF6600] text-white rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-[#E65C00] transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50"
            >
              {loading ? 'Saving Changes...' : 'Update Job Listing'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
