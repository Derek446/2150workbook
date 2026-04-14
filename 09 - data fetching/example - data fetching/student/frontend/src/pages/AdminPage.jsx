import { useNavigate } from 'react-router';

import { Form, useLoaderData, useNavigation } from 'react-router';
import Card from '../components/ui/Card';

// Now that the form has been moved into its own component, we can define a constant
// for the default form data.
const EMPTY_FORM_DATA = {
  title: '',
  category: '',
  summary: '',
  location: '',
  hours: '',
  contact: '',
  virtual: false,
  openNow: false,
};

export default function AdminPage() {
  const navigate = useNavigate();

  const { resources, selectedResource, resourceId } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // We no longer require a useEffect to track the current resource. Instead, we 
  // can derive it directly from the URL param and the list of resources. If the 
  // resourceId param is present, we find the corresponding resource from the list.
  // If it's not present, currentResource will be null, which indicates that we're
  // creating a new resource rather than editing an existing one.

  function handleEditStart(resource) {
    navigate(`/admin/${resource.id}`);
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      <section className="md:col-span-3 lg:col-span-3">
        <Form method="post" className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Title</label>
            <input
              id="q"
              name="title"
              type="text"
              className="input input-bordered w-full"
              defaultValue={selectedResource?.title ?? ''}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              id="q"
              name='category'
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultValue={selectedResource?.category ?? ''}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Summary</label>
            <input
              id="q"
              name='summary'
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultValue={selectedResource?.summary ?? ''}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="q"
              name='location'
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultValue={selectedResource?.location ?? ''}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Hours</label>
            <input
              id="q"
              name='hours'
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultValue={selectedResource?.hours ?? ''}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              id="q"
              name='contact'
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultValue={selectedResource?.contact ?? ''}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Virtual</label>
            <input
              id="q"
              name='virtual'
              type="checkbox"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultChecked={selectedResource?.virtual ?? false}
            />
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">Open Now</label>
            <input
              id="q"
              name='open'
              type="checkbox"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              defaultChecked={selectedResource?.openNow ?? false}
            />
          </div>

          <button
            type="submit"
            className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving...'
              : resourceId
                ? 'Update Resource'
                : 'Add Resource'}
          </button>
        </Form>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded border border-gray-200 p-3 cursor-pointer hover:border-sky-400"
                  onClick={() => handleEditStart(resource)}>
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
};