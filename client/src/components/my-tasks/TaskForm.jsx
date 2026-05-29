import { useState } from "react";
import { submitWorkerImage } from "../../services/uploadService";


function TaskForm({ 
  assignmentWorkerId, 
  onSuccess, 
  status, 
  onClose,
  submission
}) {

  const [notes, setNotes] = useState(
    submission?.notes || ""
  );

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(
    status === "completed"
  );
  
  // handle submit
  const handleSubmit = async () => {
    try {
      
      // prevent image empty
      if (!image) {
        alert("Please upload image");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("assignment_worker_id", assignmentWorkerId);
      formData.append("notes", notes);

      await submitWorkerImage(formData);

      setSubmitted(true)

      alert("Task submitted successfully!");

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit task");
    } finally {
      setLoading(false);
    }
  };

  // handle image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // disable button if completed
  const isCompleted = submitted;

  return (
    <div className="space-y-4">
      
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2 w-full">
          <p className="font-medium text-gray-500">
            {isCompleted 
            ? "Submitted Photo" 
            : "Attach Photo (optional)"
            }
          </p>

          {isCompleted ? (
            submission?.image_url ? (
              <img
                src={submission.image_url}
                alt="Submission"
                className="w-32 h-32 object-cover rounded-md border border-gray-400"
              />
            ) : (
              <p className="text-gray-400 text-sm italic">No photo submitted</p>
            )
          ) : (
            <>
              <label className="border-2 border-dashed p-10 flex w-full border-gray-500 justify-center hover:border-blue-500 transition duration-300 cursor-pointer rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-gray-500">
                  {image ? image.name : "Click to upload image"}
                </span>
              </label>

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded-md p-2 mt-1 disabled:bg-gray-50 disabled:text-gray-500"
            rows={4}
            placeholder="Write your work details..."
            disabled={isCompleted}
          />
        </div>
      </div>


      <button
        onClick={handleSubmit}
        disabled={loading || isCompleted}
        className={`
          w-full p-2 rounded-md text-white font-semibold
          ${
            loading || isCompleted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400"
          }
        `}
      >
        {isCompleted
          ? "Task Submitted"
          : loading
            ? "Submitting..."
            : "Submit Task"}
      </button>

    </div>
  );
}

export default TaskForm;