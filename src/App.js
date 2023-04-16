import React, { useState } from "react";
import "./App.css";

const floors = [
  { label: "1st Floor", value: "1" },
  { label: "2nd Floor", value: "2" },
  { label: "3rd Floor", value: "3" },
  // Add more floors as needed
];

let rooms = [
  {
    roomNumber: "101",
    floor: "1",
    occupants: ["John", "Jane"],
    price: 100,
    checkedIn: true,
    numAdults: 2,
  },
  {
    roomNumber: "102",
    floor: "1",
    occupants: [],
    price: 80,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "103",
    floor: "1",
    occupants: [],
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "201",
    floor: "2",
    occupants: ["Bob"],
    price: 120,
    checkedIn: true,
    numAdults: 2,
  },
  {
    roomNumber: "202",
    floor: "2",
    occupants: [],
    price: 90,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "301",
    floor: "3",
    price: 150,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "302",
    floor: "3",
    price: 1500,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "303",
    floor: "3",
    price: 150,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "304",
    floor: "3",
    price: 150,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "305",
    floor: "3",
    price: 1500,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "306",
    floor: "3",
    price: 1500,
    checkedIn: false,
    numAdults: 1,
  },
  {
    roomNumber: "307",
    floor: "3",
    price: 1500,
    checkedIn: false,
    numAdults: 1,
  },
  // Add more rooms as needed
];

function App() {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    checkedIn: false,
    price: 0,
    numAdults: 1,
  });

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    setSelectedRoom(null);
  };

  const handleRoomClick = (room) => {
    console.log(room);
    setSelectedRoom(room);
    setRoomDetails({
      checkedIn: room.checkedIn,
      price: room.price,
      numAdults: room.numAdults,
    });
  };

  const handleModalClose = () => {
    setSelectedRoom(null);
  };

  const handleRoomDetailsChange = (event) => {
    setRoomDetails({
      ...roomDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleRoomSubmit = (event) => {
    event.preventDefault();

    const updatedRoom = {
      ...selectedRoom,
      checkedIn: roomDetails.checkedIn,
      price: roomDetails.price,
      numAdults: roomDetails.numAdults,
    };

    const updatedRooms = rooms.map((room) =>
      room.roomNumber === updatedRoom.roomNumber ? updatedRoom : room
    );
    setSelectedRoom(updatedRoom);
    setRoomDetails({
      checkedIn: updatedRoom.checkedIn,
      price: updatedRoom.price,
      numAdults: updatedRoom.numAdults,
    });
    rooms = updatedRooms;
  };

  const filteredRooms = rooms.filter((room) => room.floor === selectedFloor);

  return (
    <div className="App">
      <h1>Hotel Check-in App</h1>

      <label htmlFor="floor-select">Select a floor:</label>
      <select
        id="floor-select"
        value={selectedFloor}
        onChange={handleFloorChange}
      >
        <option value="">-- Select a floor --</option>
        {floors.map((floor) => (
          <option key={floor.value} value={floor.value}>
            {floor.label}
          </option>
        ))}
      </select>

      {selectedFloor && (
        <div>
          <h2>Rooms on {floors[selectedFloor - 1].label}</h2>
          <div className="room-list">
            {filteredRooms.map((room) => (
              <div
                key={room.roomNumber}
                className={`room-card ${
                  selectedRoom === room ? "selected" : ""
                }`}
                onClick={() => handleRoomClick(room)}
              >
                <h3>Room {room.roomNumber}</h3>

                {room.checkedIn && (
                  <>
                    <div className="room-info">
                      <p>Price: ₹{room.price}</p>
                    </div>
                    <div>
                      <p className="checked-in">Checked In</p>
                      <button className="check-out">Check Out</button>
                    </div>
                  </>
                )}
                {/* <div className="occupants">
                  <p>Occupants:</p>
                  <ul>
                    {room.occupants.map((occupant, index) => (
                      <li key={index}>{occupant}</li>
                    ))}
                  </ul>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedRoom && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h3>Room {selectedRoom.roomNumber}</h3>
            <form onSubmit={handleRoomSubmit}>
              <label htmlFor="checked-in-checkbox">Checked In:</label>
              <input
                id="checked-in-checkbox"
                type="checkbox"
                name="checkedIn"
                checked={roomDetails.checkedIn}
                onChange={handleRoomDetailsChange}
              />
              <br />
              <label htmlFor="price-input">Price:</label>
              <input
                id="price-input"
                type="number"
                name="price"
                value={roomDetails.price}
                onChange={handleRoomDetailsChange}
              />
              <br />
              <label htmlFor="num-adults-input">Number of Adults:</label>
              <input
                id="num-adults-input"
                type="number"
                name="numAdults"
                value={roomDetails.numAdults}
                onChange={handleRoomDetailsChange}
              />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
