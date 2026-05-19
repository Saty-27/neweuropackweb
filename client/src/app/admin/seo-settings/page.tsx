'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';
import { Globe, Shield, Code, Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface HtmlVerificationFile {
  _id?: string;
  filename: string;
  content: string;
}

export default function SeoSettingsPage() {
  const [googleSiteVerification, setGoogleSiteVerification] = useState('');
  const [bingSiteVerification, setBingSiteVerification] = useState('');
  const [yahooSiteVerification, setYahooSiteVerification] = useState('');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [htmlFiles, setHtmlFiles] = useState<HtmlVerificationFile[]>([]);

  // Local state for adding a new verification file
  const [newFilename, setNewFilename] = useState('');
  const [newContent, setNewContent] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetchAPI('/site-settings');
      if (res.success && res.data) {
        setGoogleSiteVerification(res.data.googleSiteVerification || '');
        setBingSiteVerification(res.data.bingSiteVerification || '');
        setYahooSiteVerification(res.data.yahooSiteVerification || '');
        setGoogleAnalyticsId(res.data.googleAnalyticsId || '');
        setHtmlFiles(res.data.htmlVerificationFiles || []);
      }
    } catch (e: any) {
      console.error(e);
      setMessage({ type: 'error', text: 'Failed to load SEO settings.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMetaSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetchAPI('/site-settings', {
        method: 'PUT',
        body: JSON.stringify({
          googleSiteVerification,
          bingSiteVerification,
          yahooSiteVerification,
          googleAnalyticsId,
          htmlVerificationFiles: htmlFiles, // keep the files intact
        }),
      });
      if (res.success) {
        setMessage({ type: 'success', text: 'Verification tags & settings updated successfully!' });
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddHtmlFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilename || !newContent) {
      alert('Please provide both a filename and content.');
      return;
    }

    if (!newFilename.toLowerCase().endsWith('.html')) {
      alert('The file must be an HTML file (ending with .html).');
      return;
    }

    // Check if filename already exists
    if (htmlFiles.some(f => f.filename.toLowerCase() === newFilename.toLowerCase())) {
      alert('A file with this name already exists.');
      return;
    }

    const updatedFiles = [...htmlFiles, { filename: newFilename, content: newContent }];
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetchAPI('/site-settings', {
        method: 'PUT',
        body: JSON.stringify({
          googleSiteVerification,
          bingSiteVerification,
          yahooSiteVerification,
          googleAnalyticsId,
          htmlVerificationFiles: updatedFiles,
        }),
      });

      if (res.success) {
        setHtmlFiles(res.data.htmlVerificationFiles || updatedFiles);
        setNewFilename('');
        setNewContent('');
        setMessage({ type: 'success', text: `Verification file '${newFilename}' uploaded/added successfully!` });
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Failed to add verification file.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHtmlFile = async (indexToDelete: number, filename: string) => {
    if (!confirm(`Are you sure you want to delete '${filename}'?`)) return;

    const updatedFiles = htmlFiles.filter((_, i) => i !== indexToDelete);
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetchAPI('/site-settings', {
        method: 'PUT',
        body: JSON.stringify({
          googleSiteVerification,
          bingSiteVerification,
          yahooSiteVerification,
          googleAnalyticsId,
          htmlVerificationFiles: updatedFiles,
        }),
      });

      if (res.success) {
        setHtmlFiles(res.data.htmlVerificationFiles || updatedFiles);
        setMessage({ type: 'success', text: `Deleted '${filename}' successfully.` });
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Failed to delete file.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#FF6600]"></div>
        <span className="ml-3 text-slate-400 font-bold">Loading Webmaster settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">SEO & Webmaster Integrations</h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure site verification tokens and dynamic HTML verification files for Google, Bing, Yahoo, and more.
          </p>
        </div>
      </div>

      {/* Success/Error Alerts */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-semibold">{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification meta codes form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <Globe className="text-[#FF6600]" size={20} />
              <h2 className="text-lg font-black text-slate-800">Verification Codes & Analytics</h2>
            </div>

            <form onSubmit={handleSaveMetaSettings} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  Google Site Verification Code
                </label>
                <input
                  type="text"
                  value={googleSiteVerification}
                  onChange={(e) => setGoogleSiteVerification(e.target.value)}
                  placeholder="e.g. google-site-verification=XYZ123..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all text-sm"
                />
                <p className="text-slate-400 text-[11px] mt-1.5">
                  Paste the content value from your Google Search Console HTML meta tag.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  Bing Webmaster Verification Code
                </label>
                <input
                  type="text"
                  value={bingSiteVerification}
                  onChange={(e) => setBingSiteVerification(e.target.value)}
                  placeholder="e.g. 1234567890ABCDEF"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all text-sm"
                />
                <p className="text-slate-400 text-[11px] mt-1.5">
                  Paste the verification code from Bing Webmaster portal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  Yahoo Verification Code
                </label>
                <input
                  type="text"
                  value={yahooSiteVerification}
                  onChange={(e) => setYahooSiteVerification(e.target.value)}
                  placeholder="e.g. yahoo-site-verification=XYZ..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all text-sm"
                />
              </div>

              <div className="border-t border-slate-100 pt-6">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  placeholder="e.g. G-XXXXXXX or GTM-XXXXXXX"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all text-sm"
                />
                <p className="text-slate-400 text-[11px] mt-1.5">
                  Will automatically inject standard gtag.js integration script tag.
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-[#FF6600] hover:bg-orange-600 transition-all disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Meta Integration Codes'}
              </button>
            </form>
          </div>

          {/* Verification Files list */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <Shield className="text-[#FF6600]" size={20} />
              <h2 className="text-lg font-black text-slate-800">Dynamic HTML Verification Files</h2>
            </div>

            <div className="space-y-4">
              {htmlFiles.length === 0 ? (
                <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-xs">No static HTML verification files uploaded yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {htmlFiles.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{file.filename}</p>
                        <p className="text-slate-400 text-[10px] truncate max-w-md font-mono mt-0.5">
                          {file.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={`/api/site-settings/file/${file.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#FF6600] font-bold hover:underline"
                        >
                          View File
                        </a>
                        <button
                          onClick={() => handleDeleteHtmlFile(idx, file.filename)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload dynamic html verification file */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
              <Code className="text-[#FF6600]" size={20} />
              <h2 className="text-base font-black">Upload / Register HTML Verification File</h2>
            </div>

            <form onSubmit={handleAddHtmlFile} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  required
                  value={newFilename}
                  onChange={(e) => setNewFilename(e.target.value)}
                  placeholder="e.g. google12345abcdef.html"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                  File Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="e.g. google-site-verification: google12345abcdef.html"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all text-xs font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-950 bg-white hover:bg-slate-100 transition-all disabled:opacity-50"
              >
                <Plus size={14} />
                Register File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
