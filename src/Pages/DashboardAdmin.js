import React, { useState } from "react";
import {
  DashboardOutlined,
  HomeOutlined,
  GroupOutlined,
  SwapOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Dropdown } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const items = [
  getItem("Dashboard", "1", <DashboardOutlined />, ""),
  getItem("Gestion Chambres", "sub1", <HomeOutlined />, null, [
    getItem("Ajout Nouveau Chambre", "3", null, "ajout-chambre"),
    getItem("Modification des chambres", "4", null, "modification-chambre"),
    getItem("Affectation des chambres", "5", null, "affectation-chambre"),
  ]),
  getItem("Gestion des étudiants", "sub2", <GroupOutlined />, null, [
    getItem("Validation des inscriptions", "6", null, "validation-inscription"),
    getItem("Consultation des étudiants", "7", null, "consult-etudiants"),
  ]),
  getItem("Gestion des rôles", "sub3", <SwapOutlined />, null, [
    getItem("Ajout Nouveau Rôle", "8", null, "ajout-role"),
    getItem("Modifier les Rôles", "9", null, "modife-roles"),
    getItem("Visualisation des statistiques", "10", null, "consult-stat"),
  ]),
];

const DashboardAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    console.log("Utilisateur déconnecté");
  };

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Se déconnecter",
      onClick: handleLogout,
    },
  ];

  const userMenu = (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      placement="bottomRight"
    >
      <UserSwitchOutlined
        style={{
          fontSize: "28px",
          marginRight: "20px",
          cursor: "pointer",
          color: "#000",
        }}
      />
    </Dropdown>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {items.map((item) =>
            item.children && Array.isArray(item.children) ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={`/dashboardadmin/${subItem.path}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/dashboardadmin${item.path}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            background: colorBgContainer,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px", marginRight: "16px" }}
            />
          </div>
          {userMenu}
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Page actuelle</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          App Foyer Universiatire ©{new Date().getFullYear()} dévéloppée par la
          ministère Tunisienne
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardAdmin;
