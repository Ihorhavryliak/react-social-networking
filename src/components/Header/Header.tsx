import Avatar from 'antd/lib/avatar';
import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';

import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth-reducer';
import Button from 'antd/lib/button';
import { AppDispatch } from '../../redux/redux-store';



export type MapPropsType = {
}


const Headers: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const dispatch: AppDispatch = useDispatch();

  const logOutCallback = () => {
    dispatch(logOut());
  }

  const { Header } = Layout;
  
  return (
    <Header className="header">
      <div className="logo" />
    <Row >
        <Col span={18}>
          <img width={18} alt='photos' src="https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"></img>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
        </Col>
        {isAuth
          ?<><Col span={3}> 
           {login}  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
           </Col> 
            <Col span={3} style={{textAlign: 'right'}}> 
            <Button onClick={logOutCallback}>Log out</Button>
            </Col>
            </>
          :<Col style={{textAlign: 'right'}} span={6}>
            <Button>
            <Link to='/login'>Login</Link>
            </Button>
            </Col>
        }
    </Row>
  <div/>
    </Header >

  )
}

export default Headers;