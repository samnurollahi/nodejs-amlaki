const dataView = document
  .getElementsByTagName("dataView")[0]
  .dataset.view.split(",");
const dataAd = document.getElementsByTagName("dataAd")[0].dataset.ad.split(",");

const today = new Date();

new Chart(document.getElementById("line-chart"), {
  type: "line",
  data: {
    labels: [
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      )
        .locale("fa")
        .format("D MMM YYYY"),
      moment(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
        .locale("fa")
        .format("D MMM YYYY"),
    ],
    datasets: [
      {
        data: dataAd.reverse(),
        label: "اگهی های جدید",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: dataView.reverse(),
        label: "بازدید ها",
        borderColor: "#3cba9f",
        fill: false,
      },
    ],
  },
  options: {},
});
