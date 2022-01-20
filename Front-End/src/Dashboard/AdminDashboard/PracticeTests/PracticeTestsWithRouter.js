import react from"react";
import PracticeTests from "./PracticeTests"
import { useNavigate } from 'react-router-dom';


export default function(props) {
    const navigate = useNavigate();
  
    return <PracticeTests {...props} navigate={navigate} />;
  }