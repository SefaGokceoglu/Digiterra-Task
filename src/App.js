import React, { useState, useEffect } from "react";
import "./App.css";
import mqtt from "mqtt";
import { ResizableBox } from "react-resizable";
import PieChart from "./components/PieChart/PieChart";
import Clients from "./components/Clients/Clients";
import Messages from "./components/Messages/Messages";
import Bytes from "./components/Bytes/Bytes";
import Packets from "./components/Packets/Packets";
import Subscriptions from "./components/Subscriptions/Subscriptions";
function App() {
  //Data State
  const [Data, setData] = useState({});
  const [ServerResponded, setServerResponded] = useState(false);
  const [labels, setlabels] = useState(["", "", "", "", ""]);

  //Clients Data States
  const [MaxConData, setMaxConData] = useState([0, 0, 0, 0, 0]);
  const [CurConData, setCurConData] = useState([0, 0, 0, 0, 0]);
  const [RejectedData, setRejectedData] = useState([0, 0, 0, 0, 0]);

  //Client Status State
  const [ClientStatusData, setClientStatusData] = useState([0, 0]);

  //Messages Data States
  const [SentData, setSentData] = useState([0, 0, 0, 0, 0]);
  const [ReceivedData, setReceivedData] = useState([0, 0, 0, 0, 0]);
  const [DroppedData, setDroppedData] = useState([0, 0, 0, 0, 0]);

  //Bytes Data States
  const [BytesSent, setBytesSent] = useState([0, 0, 0, 0, 0]);
  const [BytesReceived, setBytesReceived] = useState([0, 0, 0, 0, 0]);

  //Packets Data States
  const [PacketSent, setPacketSent] = useState([0, 0, 0, 0, 0]);
  const [PacketReceived, setPacketReceived] = useState([0, 0, 0, 0, 0]);

  //Subscriptions Data States
  const [ActiveSubs, setActiveSubs] = useState([0, 0, 0, 0, 0]);
  const [Subscribed, setSubscribed] = useState([0, 0, 0, 0, 0]);
  const [Unsubscribed, setUnsubscribed] = useState([0, 0, 0, 0, 0]);

  // UseEffect To Connect yo mqtt
  useEffect(() => {
    const client = mqtt.connect("wss://mqtttest.connio.cloud:8083/mqtt", {
      clientId: "digiterra-coding-task-1",
      host: "ws://mqtttest.connio.cloud:8083/mqtt",
      username: "",
      password: "",
    });

    client.on("connect", () => {
      client.subscribe("$SYS", (err, granted) => {
        client.on("message", (topic, payload, packet) => {
          setData(JSON.parse(payload));
          if (!ServerResponded) {
            setServerResponded(true);
          }
        });
      });
    });
  }, []);

  // UseEffect To Get Datas
  useEffect(() => {
    if (ServerResponded) {
      const dt = new Date();
      const hour = dt.getHours();
      const min = dt.getMinutes();
      const sec = dt.getSeconds();
      //labels for Charts
      labels.shift();
      setlabels([
        ...labels,
        `${hour.toString()}:${
          min.toString() < 10 ? "0" + min.toString() : min.toString()
        }:${sec.toString() < 10 ? "0" + sec.toString() : sec.toString()}`,
      ]);
      // Max Conneced Data Handling

      MaxConData.shift();
      setMaxConData([...MaxConData, Data.maxConnected]);

      // Current Connection Data Handling

      CurConData.shift();
      setCurConData([...CurConData, Data.connected]);

      // Rejected Data Handling

      RejectedData.shift();
      setRejectedData([...RejectedData, Data.rejected]);

      // Message Dropped Handling

      DroppedData.shift();
      setDroppedData([...DroppedData, Data.messageDropped]);

      // Message Sent Handling

      SentData.shift();
      setSentData([...SentData, Data.messageSent]);

      // Message Sent Received Handling

      ReceivedData.shift();
      setReceivedData([...ReceivedData, Data.messageReceived]);

      //Bytes Sent Handling
      BytesSent.shift();
      setBytesSent([...BytesSent, Data.messageBytesSent]);

      //Bytes Reveived Handling
      BytesReceived.shift();
      setBytesReceived([...BytesReceived, Data.messageBytesReceived]);

      //Packet Sent Handling
      PacketSent.shift();
      setPacketSent([...PacketSent, Data.packetSent]);

      //Packet Received Handling
      PacketReceived.shift();
      setPacketReceived([...PacketReceived, Data.packetReceived]);

      // Active Subscriptions Handling
      ActiveSubs.shift();
      setActiveSubs([...ActiveSubs, Data.activeSubscriptions]);

      // Subscribed Handling
      Subscribed.shift();
      setSubscribed([...Subscribed, Data.subscribed]);

      // Unsubscribed Handling
      Unsubscribed.shift();
      setUnsubscribed([...Unsubscribed, Data.unsubscribed]);

      // Client Status Chart Data
      setClientStatusData([Data.connected, Data.disconnected]);
    }
  }, [Data]);

  return (
    <div className="App bg-white shadow rounded m-5">
      <div className="d-flex justify-content-center">
        <ResizableBox
          className="bg-white shadow rounded m-5 "
          width={350}
          height={350}
          minConstraints={[230, 250]}
          maxConstraints={[500, 500]}
        >
          <PieChart ClientStatusData={ClientStatusData} />
        </ResizableBox>
        <div className="ml-2 mt-5">
          <ResizableBox
            className="bg-white shadow rounded mb-5"
            width={270}
            height={150}
            minConstraints={[150, 150]}
            maxConstraints={[350, 200]}
          >
            <div className="p-4">
              <h6> Retained Messages</h6>
              <hr className="mb-4" />
              <p> {Data.retainedMessages}</p>
            </div>
          </ResizableBox>
          <div className="d-flex ">
            <ResizableBox
              className="bg-white shadow rounded"
              width={125}
              height={150}
              minConstraints={[125, 150]}
              maxConstraints={[250, 150]}
            >
              <div className="p-4">
                <h6> Pending Messages</h6>
                <hr className="mb-4" />
                <p>{Data.pendingMessages}</p>
              </div>
            </ResizableBox>
            <ResizableBox
              className="bg-white shadow rounded mx-3"
              width={125}
              height={150}
              minConstraints={[125, 150]}
              maxConstraints={[250, 150]}
            >
              <div className="p-4">
                <h6> Offline Sessions</h6>
                <hr className="mb-4" />
                <p> {Data.offlineSessions}</p>
              </div>
            </ResizableBox>
          </div>
        </div>
        <ResizableBox
          className="bg-white shadow rounded m-5 pt-3"
          width={450}
          height={350}
          minConstraints={[400, 325]}
          maxConstraints={[900, 400]}
        >
          <Clients
            labels={labels}
            MaxConData={MaxConData}
            CurConData={CurConData}
            RejectedData={RejectedData}
          />
        </ResizableBox>
        <ResizableBox
          className="bg-white shadow rounded m-5 pt-3"
          width={450}
          height={350}
          minConstraints={[400, 325]}
          maxConstraints={[900, 400]}
        >
          <Messages
            SentData={SentData}
            ReceivedData={ReceivedData}
            DroppedData={DroppedData}
            labels={labels}
          />
        </ResizableBox>
      </div>
      <div className="d-flex justify-content-center">
        <ResizableBox
          className="bg-white shadow rounded m-5 pt-3"
          width={450}
          height={350}
          minConstraints={[400, 325]}
          maxConstraints={[900, 400]}
        >
          <Bytes
            BytesSent={BytesSent}
            BytesReceived={BytesReceived}
            labels={labels}
          />
        </ResizableBox>
        <ResizableBox
          className="bg-white shadow rounded m-5 pt-3"
          width={450}
          height={350}
          minConstraints={[400, 325]}
          maxConstraints={[900, 400]}
        >
          <Packets
            PacketSent={PacketSent}
            PacketReceived={PacketReceived}
            labels={labels}
          />
        </ResizableBox>
        <ResizableBox
          className="bg-white shadow rounded m-5 pt-3"
          width={450}
          height={350}
          minConstraints={[400, 325]}
          maxConstraints={[900, 400]}
        >
          <Subscriptions
            labels={labels}
            ActiveSubs={ActiveSubs}
            Subscribed={Subscribed}
            Unsubscribed={Unsubscribed}
          />
        </ResizableBox>
      </div>
    </div>
  );
}

export default App;
