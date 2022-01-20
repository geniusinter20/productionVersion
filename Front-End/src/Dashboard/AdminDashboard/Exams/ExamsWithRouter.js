import react from"react";
import Exams from "./Exams"
import { useNavigate, useLocation} from 'react-router-dom';


export default function(props) {
    const navigate = useNavigate();
    let location = useLocation();
  
    return <Exams {...props} navigate={navigate} loaction={location}  />;
  }