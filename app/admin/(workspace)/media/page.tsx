import { requirePage } from "@/lib/cms/access";
import { MediaLibrary } from "@/components/admin/media-library";
export default async function MediaPage() {
  await requirePage();
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Image library</h1>
          <p>Photographs from our church life, ready for events and stories.</p>
        </div>
      </div>
      <MediaLibrary canUpload={true} />
    </>
  );
}
