import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { Spin, Row, Col } from "antd";

const VisulisationStat = () => {
  const [loading, setLoading] = useState(true);
  const [chambresStats, setChambresStats] = useState({});
  const [etudiantsStats, setEtudiantsStats] = useState({});

  // Couleurs pour le graphique
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Fetch statistiques
  const fetchStatistiques = async () => {
    setLoading(true);
    try {
      const chambresResponse = await axios.get(
        "http://localhost:8080/api/statistiques/chambres"
      );
      const etudiantsResponse = await axios.get(
        "http://localhost:8080/api/statistiques/etudiants"
      );
      setChambresStats(chambresResponse.data);
      setEtudiantsStats(etudiantsResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistiques();
  }, []);

  // Données pour le graphique des chambres
  const chambresData = [
    { name: "Libres", value: chambresStats.libres || 0 },
    { name: "Occupées", value: chambresStats.occupees || 0 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {/* Graphique des chambres */}
          <Col span={12}>
            <h2>Statistiques des Chambres</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={chambresData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chambresData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Col>

          {/* Graphique des étudiants */}
          <Col span={12}>
            <h2>Statistiques des Étudiants</h2>
            <BarChart
              width={500}
              height={300}
              data={[
                {
                  name: "Étudiants",
                  nombre: etudiantsStats.nombreEtudiants || 0,
                },
              ]}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="nombre" fill="#82ca9d" />
            </BarChart>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default VisulisationStat;
