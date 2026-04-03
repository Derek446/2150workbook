// react router hooks
import { useNavigate, useParams } from 'react-router';
// our hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from '../components/ui/Card';
import ResourceForm from '../components/ResourceForm';

const EXAMPLE_RESOURCE = {
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Some summary of the resource.',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  contact: 'study@nait.ca',
  virtual: false,
  openNow: false,
};


export default function AdminPage() {

  // we could use const params = useParams(); and then params.resourceID
  const { resourceId } = useParams();
  const navigate = useNavigate();

  const { resources, isLoading, error, refetch } = useResources();

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

      {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )}

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <ResourceForm
              key={resourceId ?? 'new'}
              initialData={EXAMPLE_RESOURCE}
              isEditing={Boolean(resourceId)}
              resourceId={resourceId}
              resources={resources}
            />
          </div>
        </Card>
      </section >

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded border border-gray-200 p-3 cursor-pointer hover:border-sky-400"
                  onClick={() => handleEditStart(resource)}
                >
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