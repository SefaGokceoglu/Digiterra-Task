import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ ClientStatusData }) {
  return (
    <div>
      <Pie
        options={{
          maintainAspectRatio: false,
          title: {
            text: "Client Status",
            display: true,
          },
        }}
        height={250}
        width={250}
        data={{
          labels: ["Connected Clients", "Disconnected Clients"],
          datasets: [
            {
              data: ClientStatusData,
              backgroundColor: ["#feb236", "#d64161"],
            },
          ],
        }}
      />
    </div>
  );
}

export default PieChart;
