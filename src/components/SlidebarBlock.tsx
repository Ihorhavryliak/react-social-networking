import { NavLink } from 'react-router-dom';
import React from 'react';
import { UserOutlined, SoundOutlined, TeamOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';

export const SlidebarBlock = () => {
  return (
    <>
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={[
          {
            label: 'My profile', key: '1', type: 'group',
            children: [{ label: <NavLink to="/profile">Profile</NavLink>, key: '2', icon: <UserOutlined /> },
            { label: <NavLink to="/dialogs">Message</NavLink>, key: '3', icon: <MailOutlined /> },
            { label: <NavLink to="/users">Users</NavLink>, key: '4', icon: <TeamOutlined /> },
            { label: <NavLink to="/chat">Shared chat</NavLink>, key: '4.1', icon: <SoundOutlined /> },

            ],
          },
          /*     {
                label: 'Under development', key: '5', icon: <ScheduleOutlined />,
                children: [{ label: <NavLink to="/news">News</NavLink>, key: '6', icon: null },
                { label: <NavLink to="/music">Music</NavLink>, key: '7', icon: null },
                { label: <NavLink to="/setting">Settings</NavLink>, key: '8', icon: null },
                ],
    
              }, */
        ]} />
    </Sider>
    </>
  );
}
