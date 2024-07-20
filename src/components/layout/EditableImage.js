import Image from "next/image";
import toast from "react-hot-toast";
import { useEdgeStore } from "../../libs/edgestore";

export default function EditableImage({ link, setLink }) {
  const { edgestore } = useEdgeStore();

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const file = files[0];

      const uploadPromise = edgestore.publicImages
        .upload({
          file,
        })
        .then((res) => {
          setLink(res.url); // Assuming 'res' contains the uploaded image link
        })
        .catch((error) => {
          throw new Error("Something went wrong"); // Handle error as needed
        });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
