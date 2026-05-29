import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import DefectForm from "../../components/report-defect/DefectForm";
import { createReport } from "../../services/reportService";
import { uploadReportImage } from "../../services/uploadService";
import FloorRoomSelect from "../../components/report-defect/floorRoomSelect";
import { AlertTriangle } from "lucide-react";

function ReportDefect() {
  const { user } = useAuth();

  // get rooms db
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [resetKey, setResetKey] = useState(0);
  // default form
  const [defects, setDefects] = useState([
    {
      title: "",
      defect_type: "civil",
      priority_level: "low",
      image: null,
    },
  ]);

  // fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axiosInstance.get("/rooms");
      setRooms(res.data);
    }

    fetchRooms();
  }, []);

  // handle submit report
  const handleSubmit = async () => {
    if (!roomId || defects.length === 0) return;
    if (loading) return;

    setLoading(true);

    console.log(defects);
    console.log("Submitting...");

    try {
      // create report to reports db
      const result = await createReport({
        room_id: roomId,
        created_by: user.id,
        defects: defects.map((d) => ({
          title: d.title,
          defect_type: d.defect_type,
          priority_level: d.priority_level,
        })),
      });

      // upload images to report_item_images
      for (let i = 0; i < defects.length; i++) {
        const image = defects[i].image;

        if (!image) continue;

        const reportItemId = result.report_items[i].id;

        const formData = new FormData();

        formData.append("image", image);
        formData.append("report_item_id", reportItemId); // get report_items id

        await uploadReportImage(formData);
      }

      console.log(result);
      alert("Report submitted successfully!");

      // reset state
      setRoomId("");
      setSelectedFloor("");

      setDefects([
        {
          title: "",
          defect_type: "civil",
          priority_level: "low",
          image: null,
        },
      ]);

      // force file input reset
      setResetKey((prev) => prev + 1);

    } catch (err) {
      console.error("FULL ERROR:", err);
      console.log("RESPONSE:", err?.response?.data);

      alert(
        err?.response?.data?.error ||
        err.message ||
        "Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-row items-center gap-4">
        <AlertTriangle className="w-8 h-8 text-red-500"/>
        <div className="">
          <p className="text-2xl font-bold">
            Report a Defect
          </p>
          <p className="text-gray-500">
            Pinpoint the location, then list every defect found there.
          </p>
        </div>
      </div>

      <FloorRoomSelect
      rooms={rooms}
      selectedFloor={selectedFloor}
      setSelectedFloor={setSelectedFloor}
      roomId={roomId}
      setRoomId={setRoomId}
      />

      <DefectForm
        defects={defects}
        setDefects={setDefects}
        resetKey={resetKey}
      />
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`text-white font-medium p-3 rounded-md w-full flex justify-center items-center transition duration-300 ${
          loading 
            ? "bg-gray-500 cursor-not-allowed" 
            : "bg-red-500 hover:bg-red-400"
        }`}
      >
        {loading 
        ? "Submitting..." 
        : "Submit Report"
        }
      </button>
    </div>
  );
}

export default ReportDefect;