import React, { Component } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaBell, FaGear, FaRepeat } from "react-icons/fa6";
import { collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

class Banner extends Component {
  state = {
    showLog: false,
    pickupLog: [],
  };

  toggleLog = async () => {
    this.setState((prevState) => ({ showLog: !prevState.showLog }));

    // Load the log data if opening the log
    if (!this.state.showLog) {
      try {
        const logCollectionRef = collection(db, "dailyLogs");
        const querySnapshot = await getDocs(logCollectionRef);
        const logs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.setState({ pickupLog: logs });
      } catch (err) {
        console.error("Error fetching pickup logs: ", err);
      }
    }
  };

  clearLog = async () => {
    try {
      const logCollectionRef = collection(db, "dailyLogs");
      const querySnapshot = await getDocs(logCollectionRef);

      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(docSnapshot.ref)
      );

      await Promise.all(deletePromises);
      this.setState({ pickupLog: [] });
      console.log("Pickup log cleared successfully.");
    } catch (err) {
      console.error("Error clearing pickup logs: ", err);
    }
  };

  resetAllStudents = async () => {
    try {
      const studentsCollectionRef = collection(db, "studentsExample");
      const querySnapshot = await getDocs(studentsCollectionRef);

      const now = new Date(); // Use current date/time for `timePicked`

      const resetPromises = querySnapshot.docs.map((docSnapshot) =>
        updateDoc(docSnapshot.ref, {
          present: true,
          timePicked: "",
        })
      );

      await Promise.all(resetPromises);
      console.log("All student statuses reset successfully.");

      if (this.props.onReset) {
        this.props.onReset(); // Trigger the refresh in the App component
      }
    } catch (err) {
      console.error("Error resetting all student statuses: ", err);
    }
  };

  render() {
    return (
      <div className="bg-[#EB4A00] py-2 flex justify-between px-2 mb-2 relative">
        <p className="font-bold text-white text-2xl">SafeLine</p>
        <div className="flex items-center gap-2 text-xl text-white">
          <FaRegQuestionCircle />
          <button onClick={this.toggleLog}>
            <FaBell />
          </button>
          <FaGear />
          <button onClick={this.resetAllStudents}>
            <FaRepeat />
          </button>
        </div>

        {/* Pickup Log */}
        {this.state.showLog && (
          <div className="absolute right-2 top-14 bg-white border rounded shadow-md w-96 max-h-80 overflow-y-auto p-4 z-50">
            <h3 className="font-semibold text-lg mb-2">Pickup Log</h3>
            {this.state.pickupLog.length > 0 ? (
              this.state.pickupLog.map((log) => (
                <div
                  key={log.id}
                  className="border-b py-2 text-sm text-gray-700"
                >
                  <p>
                    <span className="font-bold">
                      {log.lname}, {log.fname} ({log.id})
                    </span>{" "}
                    picked up at{" "}
                    {new Date(log.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No pickups logged yet.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Banner;
