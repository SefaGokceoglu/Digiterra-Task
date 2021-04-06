import React from "react";
import { Line } from "react-chartjs-2";
function Clients({ labels, RejectedData, MaxConData, CurConData }) {
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
            text: "Clients",
            display: true,
          },
        }}
        height={300}
        width={750}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Maximum Connected Clients",
              data: MaxConData,
              borderColor: "#2d89ef",
            },
            {
              label: "Current Connected Clients",
              data: CurConData,
              borderColor: "#ffc40d",
            },
            {
              label: "Rejected",
              data: RejectedData,
              borderColor: "#ee1111",
            },
          ],
        }}
      />
    </div>
  );
}

export default Clients;
