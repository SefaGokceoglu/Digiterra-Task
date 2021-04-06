import React from "react";
import { Line } from "react-chartjs-2";
function Subscriptions({ labels, ActiveSubs, Subscribed, Unsubscribed }) {
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
            text: "Subscriptions",
            display: true,
          },
        }}
        height={300}
        width={750}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Active Subsciptions",
              data: ActiveSubs,
              borderColor: "#2d89ef",
            },
            {
              label: "Subscribed",
              data: Subscribed,
              borderColor: "#ffc40d",
            },
            {
              label: "Unsubscribed",
              data: Unsubscribed,
              borderColor: "#ee1111",
            },
          ],
        }}
      />
    </div>
  );
}

export default Subscriptions;
