import React from "react";
import { Line } from "react-chartjs-2";

function Packets({ labels, PacketReceived, PacketSent }) {
  return (
    <div>
      <Line
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },

          title: {
            text: "Packets",
            display: true,
          },
        }}
        height={300}
        width={750}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Sent",
              data: PacketSent,
              borderColor: "#2d89ef",
            },
            {
              label: "Recieved",
              data: PacketReceived,
              borderColor: "#ffc40d",
            },
          ],
        }}
      />
    </div>
  );
}

export default Packets;
