import { Plus, Trash2 } from "lucide-react";

function DefectForm({ defects, setDefects, resetKey }) {

  // update item
  const updateItem = (index, field, value) => {
    const updated = [...defects];
    updated[index][field] = value;
    setDefects(updated);
  };

  // add new defect
  const addItem = () => {
    setDefects([
      ...defects,
      {
        title: "",
        defect_type: "civil",
        priority_level: "low",
        image: null,
      },
    ]);
  };

  // remove defect form
  const removeItem = (indexToRemove) => {
    const updated = defects.filter((_, index) => index !== indexToRemove);
    setDefects(updated);
  };

  return (
    <div className="w-full flex flex-col gap-y-4">

      <div className="bg-white p-5 rounded-md shadow">
        <p className="font-bold">2. List Defects</p>
      </div>

      {defects.map((item, index) => (
        <div
          key={index}
          className="bg-white p-5 gap-y-5 flex flex-col shadow rounded-md w-full border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-600 text-sm bg-blue-50 px-3 py-2 rounded-full">
              Defect #{index + 1}
            </span>
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-red-500 hover:text-red-700 justify-center hover:bg-red-50 rounded-md flex items-center gap-x-1 text-sm font-medium transition duration-200"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          )}

          <div className="flex flex-col gap-y-2 w-full">
            <p className="font-medium text-gray-500">
              Title <span className="text-red-500">*</span>
            </p>
            <input
              placeholder="e.g Leaking on the pipe"
              className="border p-2 w-full rounded-md border-gray-500 focus:border-blue-500 outline-none"
              value={item.title}
              required
              onChange={(e) => updateItem(index, "title", e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5 w-full">
            <div className="w-full flex flex-col gap-y-2">
              <p className="font-medium text-gray-500">
                Defect Type <span className="text-red-500">*</span>
              </p>
              <select
                className="border border-gray-500 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={item.defect_type}
                onChange={(e) => updateItem(index, "defect_type", e.target.value)}
              >
                <option value="civil">Civil</option>
                <option value="machinery">Machinery</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <p className="font-medium text-gray-500">
                Priority Level <span className="text-red-500">*</span>
              </p>
              <select
                className="border border-gray-500 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={item.priority_level}
                onChange={(e) => updateItem(index, "priority_level", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <p className="font-medium text-gray-500">Attach Photo (optional)</p>
            <label className="border-2 border-dashed p-10 flex w-full border-gray-500 justify-center hover:border-blue-500 transition duration-300 cursor-pointer rounded-md">
              <input
                key={resetKey}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updateItem(index, "image", e.target.files[0])}
              />
              <span className="text-gray-500">
                {item.image ? item.image.name : "Click to upload image"}
              </span>
            </label>

            {item.image && (
              <img
                src={URL.createObjectURL(item.image)}
                alt="preview"
                className="w-32 h-32 object-cover mt-2 rounded"
              />
            )}
          </div>
        </div>
      ))}

      {/* ADD BUTTON */}
      <div className="w-full flex mt-2">
        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 text-white font-medium p-3 rounded-md w-full hover:bg-blue-400 flex justify-center items-center gap-x-2 transition duration-300"
        >
          <Plus className="w-5 h-5" /> Add More Defect
        </button>
      </div>
    </div>
  );
}

export default DefectForm;
