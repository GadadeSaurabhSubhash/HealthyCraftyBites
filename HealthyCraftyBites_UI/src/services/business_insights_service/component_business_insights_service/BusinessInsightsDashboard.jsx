import { useEffect, useState } from "react";

import "../css_business_insights_service/BusinessInsightsDashboardCSS.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut, PolarArea, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
);

function BusinessInsightsDashboard() {
  /*=================================================
      State
  =================================================*/

  const [dailyRevenueSummary, setDailyRevenueSummary] = useState([]);

  const [customerReviewSummary, setCustomerReviewSummary] = useState({});

  const [productSalesSummary, setProductSalesSummary] = useState([]);

  const [ingredientSalesSummary, setIngredientSalesSummary] = useState([]);

  /*=================================================
      Dummy Data
      Replace this with Backend API data later
  =================================================*/

  useEffect(() => {
    setDailyRevenueSummary([
      {
        date: "1 Aug",
        totalRevenue: 18200,
        totalOrders: 132,
        averageOrderValue: 138,
      },
      {
        date: "2 Aug",
        totalRevenue: 20150,
        totalOrders: 148,
        averageOrderValue: 136,
      },
      {
        date: "3 Aug",
        totalRevenue: 22400,
        totalOrders: 163,
        averageOrderValue: 137,
      },
      {
        date: "4 Aug",
        totalRevenue: 19600,
        totalOrders: 142,
        averageOrderValue: 138,
      },
      {
        date: "5 Aug",
        totalRevenue: 24750,
        totalOrders: 179,
        averageOrderValue: 138,
      },
    ]);

    setCustomerReviewSummary({
      foodQualityRating: 4.8,
      customizationRating: 4.5,
      appRating: 4.3,
      staffRating: 4.7,
      totalReviews: 185,
    });

    setProductSalesSummary([
      {
        productId: 1,
        productName: "Chicken Delight Salad",
        salesCount: 210,
      },
      {
        productId: 2,
        productName: "Paneer Delight Roll",
        salesCount: 195,
      },
      {
        productId: 3,
        productName: "Veggie Feast Sandwich",
        salesCount: 182,
      },
      {
        productId: 4,
        productName: "Egg Blaster Roll",
        salesCount: 171,
      },
      {
        productId: 5,
        productName: "Protein Blast Smoothie",
        salesCount: 160,
      },
      {
        productId: 6,
        productName: "Grilled Chicken Sandwich",
        salesCount: 150,
      },
      {
        productId: 7,
        productName: "Veggie Feast Salad",
        salesCount: 145,
      },
      {
        productId: 8,
        productName: "Tofu Supreme Sandwich",
        salesCount: 138,
      },
      {
        productId: 9,
        productName: "Salmon Supreme Salad",
        salesCount: 130,
      },
      {
        productId: 10,
        productName: "Mineral Water",
        salesCount: 125,
      },
    ]);

    setIngredientSalesSummary([
      {
        ingredientId: 1,
        ingredientName: "Tomato",
        usageCount: 430,
      },
      {
        ingredientId: 2,
        ingredientName: "Lettuce",
        usageCount: 415,
      },
      {
        ingredientId: 3,
        ingredientName: "Onion",
        usageCount: 395,
      },
      {
        ingredientId: 4,
        ingredientName: "Chicken",
        usageCount: 370,
      },
      {
        ingredientId: 5,
        ingredientName: "Paneer",
        usageCount: 340,
      },
      {
        ingredientId: 6,
        ingredientName: "Capsicum",
        usageCount: 330,
      },
      {
        ingredientId: 7,
        ingredientName: "Sweet Corn",
        usageCount: 315,
      },
      {
        ingredientId: 8,
        ingredientName: "Cucumber",
        usageCount: 295,
      },
      {
        ingredientId: 9,
        ingredientName: "Black Beans",
        usageCount: 280,
      },
      {
        ingredientId: 10,
        ingredientName: "Carrot",
        usageCount: 270,
      },
    ]);
  }, []);
  /*=================================================
      Revenue Chart Data
  =================================================*/

  const revenueChartData = {
    labels: dailyRevenueSummary.map((item) => item.date),

    datasets: [
      {
        label: "Revenue (₹)",

        data: dailyRevenueSummary.map((item) => item.totalRevenue),

        borderColor: "#00E676",

        backgroundColor: "#00E676",

        pointBackgroundColor: "#00E676",

        pointBorderColor: "#FFFFFF",

        pointRadius: 4,

        tension: 0.4,
      },
    ],
  };

  /*=================================================
      Customer Rating Chart Data
  =================================================*/

  const customerRatingChartData = {
    labels: ["Food", "Customization", "App", "Staff"],

    datasets: [
      {
        data: [
          customerReviewSummary.foodQualityRating || 0,

          customerReviewSummary.customizationRating || 0,

          customerReviewSummary.appRating || 0,

          customerReviewSummary.staffRating || 0,
        ],

        backgroundColor: ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63"],

        borderColor: "#FFFFFF",

        borderWidth: 2,
      },
    ],
  };

  /*=================================================
      Product Sales - Polar Area Chart Data
  =================================================*/

  const productSalesChartData = {
    labels: productSalesSummary.map((item) => item.productName),

    datasets: [
      {
        label: "Sales",

        data: productSalesSummary.map((item) => item.salesCount),

        backgroundColor: [
          "rgba(255, 213, 79, 0.85)",
          "rgba(255, 183, 77, 0.85)",
          "rgba(255, 138, 101, 0.85)",
          "rgba(186, 104, 200, 0.85)",
          "rgba(100, 181, 246, 0.85)",
          "rgba(77, 182, 172, 0.85)",
          "rgba(174, 213, 129, 0.85)",
          "rgba(149, 117, 205, 0.85)",
          "rgba(240, 98, 146, 0.85)",
          "rgba(129, 199, 132, 0.85)",
        ],

        borderColor: "#FFFFFF",

        borderWidth: 1.5,
      },
    ],
  };

  /*=================================================
      Ingredient Usage Chart Data
  =================================================*/

  const ingredientUsageChartData = {
    labels: ingredientSalesSummary.map((item) => item.ingredientName),

    datasets: [
      {
        label: "Usage",

        data: ingredientSalesSummary.map((item) => item.usageCount),

        backgroundColor: "#81C784",
      },
    ],
  };

  /*=================================================
      Revenue Line Chart Options
  =================================================*/

  const lineChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `Revenue: ₹${context.raw}`;
          },
        },
      },
    },

    layout: {
      padding: 10,
    },

    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
        },

        grid: {
          color: "rgba(255,255,255,0.15)",
        },
      },

      y: {
        beginAtZero: false,

        ticks: {
          color: "#FFFFFF",

          callback: function (value) {
            return `₹${value}`;
          },
        },

        grid: {
          color: "rgba(255,255,255,0.15)",
        },
      },
    },
  };

  /*=================================================
      Customer Doughnut Chart Options
  =================================================*/

  const doughnutChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {
      legend: {
        position: "top",

        labels: {
          color: "#FFFFFF",

          font: {
            size: 12,
            weight: "bold",
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}/5`;
          },
        },
      },
    },
  };

  /*=================================================
      Product Polar Area Chart Options
  =================================================*/

  const polarAreaChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right",

        labels: {
          color: "#FFFFFF",

          boxWidth: 12,

          padding: 10,

          font: {
            size: 10,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} sales`;
          },
        },
      },
    },

    scales: {
      r: {
        beginAtZero: true,

        ticks: {
          color: "#FFFFFF",

          backdropColor: "transparent",
        },

        grid: {
          color: "rgba(255,255,255,0.15)",
        },

        angleLines: {
          color: "rgba(255,255,255,0.15)",
        },
      },
    },
  };

  /*=================================================
      Ingredient Horizontal Bar Options
  =================================================*/

  const horizontalBarOptions = {
    responsive: true,

    maintainAspectRatio: false,

    indexAxis: "y",

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `Usage: ${context.raw}`;
          },
        },
      },
    },

    scales: {
      x: {
        beginAtZero: true,

        ticks: {
          color: "#FFFFFF",
        },

        grid: {
          color: "rgba(255,255,255,0.15)",
        },
      },

      y: {
        ticks: {
          color: "#FFFFFF",
        },

        grid: {
          display: false,
        },
      },
    },
  };
  /*=================================================
      Dashboard UI
  =================================================*/

  return (
    <div className="business-dashboard-container">
      <div className="business-dashboard-grid">
        {/*=========================================
            Revenue Trend
        =========================================*/}

        <div className="business-dashboard-card">
          <h3>Revenue Trend</h3>

          <div className="business-dashboard-chart">
            <Line data={revenueChartData} options={lineChartOptions} />
          </div>
        </div>

        {/*=========================================
            Customer Review Summary
        =========================================*/}

        <div className="business-dashboard-card">
          <h3>Customer Review Summary</h3>

          <div className="business-dashboard-chart">
            <Doughnut
              data={customerRatingChartData}
              options={doughnutChartOptions}
            />
          </div>
        </div>

        {/*=========================================
            Top Selling Products
        =========================================*/}

        <div className="business-dashboard-card">
          <h3>Top Selling Products</h3>

          <div className="business-dashboard-chart">
            <PolarArea
              data={productSalesChartData}
              options={polarAreaChartOptions}
            />
          </div>
        </div>

        {/*=========================================
            Most Used Ingredients
        =========================================*/}

        <div className="business-dashboard-card">
          <h3>Most Used Ingredients</h3>

          <div className="business-dashboard-chart">
            <Bar
              data={ingredientUsageChartData}
              options={horizontalBarOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInsightsDashboard;
