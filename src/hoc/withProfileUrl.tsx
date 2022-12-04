import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter <WCT>(Component: React.ComponentType<WCT>) { 
  function ComponentWithRouterProp(props: WCT) { 
      let params = useParams(); 
      let location = useLocation(); 
      let navigate = useNavigate(); 
      return ( 
          <Component {...props} router={{params, location, navigate}}/> 
      ) 
  } 
  return ComponentWithRouterProp; 
} 

export default withRouter;