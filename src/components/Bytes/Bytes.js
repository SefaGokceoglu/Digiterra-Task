import React from "react";
import { Line } from "react-chartjs-2";
function Bytes({ labels, BytesReceived, BytesSent }) {
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
            text: "Bytes",
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
              data: BytesSent,
              borderColor: "#2d89ef",
            },
            {
              label: "Recieved",
              data: BytesReceived,
              borderColor: "#ffc40d",
            },
          ],
        }}
      />
    </div>
  );
}

export default Bytes;
