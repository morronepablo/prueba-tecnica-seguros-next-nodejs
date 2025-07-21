// frontend/app/(main)/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

// Imports para la gráfica
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registramos los componentes de Chart.js que vamos a usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Stats {
  totalProducts: number;
  lowStockProducts: number;
  sales: {
    totalRevenue: number;
    totalOrders: number;
    monthlySales: { month: string; sales: number }[];
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/stats/summary");
        setStats(data);
      } catch (error) {
        toast.error("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: stats?.sales.monthlySales.map((s) => s.month) || [],
    datasets: [
      {
        label: "Ventas Mensuales",
        data: stats?.sales.monthlySales.map((s) => s.sales) || [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Rendimiento de Ventas Simuladas",
      },
    },
  };

  if (loading)
    return (
      <AdminRoute>
        <p>Cargando dashboard...</p>
      </AdminRoute>
    );
  if (!stats)
    return (
      <AdminRoute>
        <p>No se pudieron cargar los datos.</p>
      </AdminRoute>
    );

  return (
    <AdminRoute>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Dashboard de Administrador
        </h1>

        {/* Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">
              Total de Productos
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalProducts}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">
              Productos con Bajo Stock
            </h2>
            <p className="text-3xl font-bold text-red-500">
              {stats.lowStockProducts}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">
              Ingresos Totales (Sim.)
            </h2>
            <p className="text-3xl font-bold text-green-500">
              ${stats.sales.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">
              Órdenes Totales (Sim.)
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {stats.sales.totalOrders}
            </p>
          </div>
        </div>

        {/* Gráfica */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </AdminRoute>
  );
}
