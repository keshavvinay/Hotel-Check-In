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
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "102",
    floor: "1",
    price: 0,
    checkedIn: false,
    numAdults: 0,
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
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "202",
    floor: "2",
    occupants: [],
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "301",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
    payment: "",
  },
  {
    roomNumber: "302",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "303",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "304",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "305",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "306",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  {
    roomNumber: "307",
    floor: "3",
    price: 0,
    checkedIn: false,
    numAdults: 0,
  },
  // Add more rooms as needed
];

function App() {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    checkedIn: false,
    price: 0,
    numAdults: 0,
    payment: "",
  });

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    setSelectedRoom(null);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setRoomDetails({
      checkedIn: room.checkedIn,
      price: room.price,
      numAdults: room.numAdults,
      payment: room.payment,
    });
  };

  const handleModalClose = () => {
    setSelectedRoom(null);
  };

  const handleRoomDetailsChange = (event) => {
    console.log(event.target.value);
    setRoomDetails({
      ...roomDetails,
      [event.target.name]: event.target.value,
    });
    // console.log(roomDetails);
  };

  const handleCheckOut = (event, room) => {
    event.stopPropagation();
    const emptyRoom = {
      roomNumber: room.roomNumber,
      floor: room.floor,
      checkedIn: false,
      price: 0,
      numAdults: 0,
    };
    const updatedRooms = rooms.map((room) =>
      room.roomNumber === emptyRoom.roomNumber ? emptyRoom : room
    );
    rooms = updatedRooms;
    // setSelectedRoom(emptyRoom);
    setRoomDetails({
      checkedIn: emptyRoom.checkedIn,
      price: emptyRoom.price,
      numAdults: emptyRoom.numAdults,
    });
  };

  const handleRoomSubmit = (event) => {
    event.preventDefault();

    const updatedRoom = {
      ...selectedRoom,
      checkedIn: roomDetails.checkedIn,
      price: roomDetails.price,
      numAdults: roomDetails.numAdults,
      payment: roomDetails.payment,
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
    console.log(rooms);
    handleModalClose();
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
                {room.checkedIn && (
                  <>
                    <span className="checked-in">Checked In</span>
                  </>
                )}
                <h3>Room {room.roomNumber}</h3>

                {room.checkedIn && (
                  <>
                    <button
                      className="check-out"
                      onClick={(event) => handleCheckOut(event, room)}
                    >
                      Check Out
                    </button>
                    {/* <div className="room-info">
                      <p>Price: ₹{room.price}</p>
                    </div>
                    <div>
                      <p className="checked-in">Checked In</p>
                      <button
                        className="check-out"
                        onClick={(event) => handleCheckOut(event, room)}
                      >
                        Check Out
                      </button>
                    </div> */}
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
              {/* <input
                id="num-adults-input"
                type="number"
                name="numAdults"
                value={roomDetails.numAdults}
                onChange={handleRoomDetailsChange}
              /> */}
              <select
                id="num-adults-input"
                name="numAdults"
                value={roomDetails.numAdults}
                onChange={handleRoomDetailsChange}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
                <option value="2">4</option>
                <option value="2">5</option>
              </select>
              <br />
              <label htmlFor="payment-type">Payment type : </label>
              <select
                id="payment-type"
                name="payment"
                value={roomDetails.payment}
                onChange={handleRoomDetailsChange}
              >
                <option value="">-- choose --</option>
                <option value="online">Online</option>
                <option value="cash">Cash</option>
              </select>
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
