import { useEffect, useState } from "react";
import RoomCard from "../../components/room-matrix/RoomCard";
import { getAllRooms } from "../../services/roomService";
import RoomMatrixFilter from "../../components/room-matrix/RoomMatrixFilter";
import RoomDetailModal from "../../components/room-matrix/RoomDetailModal";

function RoomMatrix() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState ("all"); // filter by categories
  const [floorFilter, setFloorFilter] = useState("all"); // filter by floor
  const [isModalOpen, setIseModalOpen] = useState(false); // modal
  const [selectedRoom, setSelectedRoom] = useState(null); // room select

  // fetch rooms db
  const fetchRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);
  
  // filter rooms
  const filteredRooms = rooms.filter((room) => {
    // filter by categories
    const matchCategory =
      categoryFilter === "all" ||
      room.room_category === categoryFilter; // db rooms/room_category
    // filter by floor
    const matchFloor =
      floorFilter === "all" ||
      room.floor.toString() === floorFilter.toString(); // db rooms/floor

    return matchCategory && matchFloor;
  });

  // group rooms by hotel and residency
  const groupedRooms = filteredRooms.reduce((acc, room) => {
    const floor = room.floor;
    const category = room.room_category;

    if (!acc[floor]) {
      acc[floor] = {};
    }

    if (!acc[floor][category]) {
      acc[floor][category] = [];
    }

    acc [floor][category].push(room);
    return acc;
  }, {});


  // sort floor dropdown (ascending)
  const floors = [...new Set(rooms.map((room) => room.floor))].sort(
    (a, b) => a - b 
  );

  // sort floor UI (ascending)
  const sortedFloors = Object.keys(groupedRooms).sort((a, b) => a - b);


  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">
        Room Matrix
      </p>

      <RoomMatrixFilter
        categoryValue={categoryFilter}
        onCategoryChange={setCategoryFilter}
        floorValue={floorFilter}
        onFloorChange={setFloorFilter}
        floors={floors}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="w-12 h-12 rounded-full border-gray-300 border-t-blue-500 border-4 animate-[spin_0.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      ) : (
        <div className="space-y-5">
          {sortedFloors.map((floor) => (

            <div 
            key={floor}
            className="flex flex-col gap-y-2"
            >
              <h2 className="text-2xl font-semibold">
                Floor {floor}
              </h2>

              <div className="bg-white p-5 rounded-md flex flex-col gap-y-5 shadow">
                {Object.entries(groupedRooms[floor]).map(
                  ([category, categoryRooms]) => (
                    <div 
                    key={category}
                    className="flex flex-col gap-y-4"
                    >
                      <h3 className="bg-gray-200 px-3 py-1 rounded-full text-sm w-fit font-semibold uppercase">
                        {category}
                      </h3>

                      <div className="flex gap-2">
                        {categoryRooms.map((room) => (
                          <RoomCard 
                          key={room.id} 
                          room={room} 
                          onClick={() => {
                            setSelectedRoom(room);
                            setIseModalOpen(true);
                          }} 
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <RoomDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIseModalOpen(false)}
        room={selectedRoom}
        onAssignmentCreated={fetchRooms}
      />
    </div>
  );
}

export default RoomMatrix;