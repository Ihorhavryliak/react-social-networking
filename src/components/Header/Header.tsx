import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import { Link, useNavigate } from 'react-router-dom';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth-reducer';
import Button from 'antd/lib/button';
import { AppDispatch, AppStateType } from '../../redux/redux-store';
import { getMessegeCount } from '../../redux/dialog-selector';
import { useEffect } from 'react';
import { messegeDisCount } from '../../redux/dialogs-reducer';
import s from '../Header/Header.module.css'
import logo from '../../assets/images/logo.png'
import noPhoto from '../../assets/images/image-user.png'
import { getUserProfile } from '../../redux/profile_reducer';

export type MapPropsType = {
}

const Headers: React.FC<MapPropsType> = (props) => {
  const { Header } = Layout;
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const dispatch: AppDispatch = useDispatch();
  const messegeCount = useSelector(getMessegeCount);
  const userId = useSelector((state: AppStateType) => state.auth.userId);
  const dateSavePhotoArr = useSelector((state: AppStateType) => state.profilePage.userPhotos);
 
  useEffect(() => {
    if (isAuth) {
      dispatch(messegeDisCount());
    }
  }, [messegeCount]);

  useEffect(() => {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    }
  }, []);
  const navigate = useNavigate();
  const logOutCallback = () => {
    dispatch(logOut());
    navigate('/login')
  }
  let mePhoto: any;
  if (dateSavePhotoArr.length > 0) {
    const objectPhoto = dateSavePhotoArr.filter(m => m.id === userId)
    if (objectPhoto.length > 0 && objectPhoto[0].photo !== null) {
      mePhoto = objectPhoto[0].photo
    } else {
      mePhoto = noPhoto
    }
  }

  if (mePhoto === undefined) {
    mePhoto = noPhoto
  }
  return (
    <Header className="header" style={{ background: '#5d7b98' }}>
      <div className="logo" />
      <Row >
        <Col span={15}>
          <img width={50} alt='photos' src={logo}></img>
        </Col>
        {isAuth
          ? <><Col span={7} style={{ color: 'white', display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
            <span style={{ color: 'white', marginRight: '15px' }} >
              <Link to="/dialogs" className='linkCountMessage'>
                {messegeCount > 0 ? 'New messeges ' + messegeCount : ''}
              </Link>
            </span>
            <span>
              <div className={s.textLogin}>{login} </div>   <img className={s.userHeaderPhoto} src={mePhoto} alt="mePhoto" />
            </span>
          </Col>
            <Col span={2} style={{ textAlign: 'right' }}>
              <Button onClick={logOutCallback}>Log out</Button>
            </Col>
          </>
          : <Col span={9} style={{ color: 'white', display: 'flex', justifyContent: 'flex-end' }}>
            <Col style={{ textAlign: 'right' }} span={2}>
              <Button>
                <Link to='/login'>Login</Link>
              </Button>
            </Col></Col>
        }
      </Row>
      <div />
    </Header >

  )
}

export default Headers;