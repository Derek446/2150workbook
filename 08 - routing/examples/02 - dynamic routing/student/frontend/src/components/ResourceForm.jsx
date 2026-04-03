import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function ResourceForm({ initialData, isEditing, resourceId, resources, refetch }) {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const isEditing = Boolean(resourceId);
    const url = isEditing
      ? `http://localhost:3000/resources/${resourceId}`
      : 'http://localhost:3000/resources';

    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
    }

    const savedResource = await res.json();
    await refetch();

    navigate(`/admin/${savedResource.id}`);
  }
  
  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      summary: '',
      location: '',
      hours: '',
      contact: '',
      virtual: false,
      openNow: false,
    });
    navigate("/admin");
  };

  useEffect(() => {
    if (!resourceId) {
      resetForm();
      return;
    }

    const resource = resources.find((item) => item.id === resourceId);

    if (!resource) return;

    setFormData({
      title: resource.title,
      category: resource.category,
      summary: resource.summary,
      location: resource.location,
      hours: resource.hours,
      contact: resource.contact,
      virtual: resource.virtual,
      openNow: resource.openNow,
    });
  }, [resourceId, resources]);

  return (
    <form onSubmit={handleSubmit} id="frm-add-resource" className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="q"
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="q"
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Summary</label>
        <input
          id="q"
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          id="q"
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Hours</label>
        <input
          id="q"
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={formData.hours}
          onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          id="q"
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Virtual</label>
        <input
          id="q"
          type="checkbox"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          checked={formData.virtual}
          onChange={(e) => setFormData({ ...formData, virtual: e.target.checked })}
        />
        <label htmlFor="q" className="block text-sm font-medium text-gray-700">Open Now</label>
        <input
          id="q"
          type="checkbox"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          checked={formData.openNow}
          onChange={(e) => setFormData({ ...formData, openNow: e.target.checked })}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="reset"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          onClick={resetForm}
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          {isEditing ? 'Update Resource' : 'Add Resource'}
        </button>
      </div>
    </form>
  );
}