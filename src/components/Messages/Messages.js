import React from "react";
import { Line } from "react-chartjs-2";
function Messages({ labels, SentData, ReceivedData, DroppedData }) {
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
                gridLines: false,
              },
            ],
          },

          title: {
            text: "Messages",
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
              data: SentData,
              borderColor: "#2d89ef",
            },
            {
              label: "Recieved",
              data: ReceivedData,
              borderColor: "#ffc40d",
            },
            {
              label: "Dropped",
              data: DroppedData,
              borderColor: "#ee1111",
            },
          ],
        }}
      />
    </div>
  );
}

export default Messages;
