import { requirePage } from "@/lib/cms/access";
import { listMedia } from "@/lib/cms/media";
import { MediaLibrary } from "@/components/admin/media-library";
export default async function MediaPage() {
  const staff = await requirePage();
  const images = await listMedia();
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Image library</h1>
          <p>Photographs from our church life, ready for events and stories.</p>
        </div>
      </div>
      <MediaLibrary
        initial={images}
        canUpload={staff.permissions.includes("media.write")}
      />
    </>
  );
}
