import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListView() {
  const [inboxData, setInboxData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/getinbox").then((res) => {
      if (res.data && res.data.length > 0) {
        setInboxData(res.data);
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleclickView = (fileId) => {
    navigate(`/pdfviewer/${fileId}`);
  };

  return (
    <div>
      <table>
        <tbody>
          {inboxData.map((item) => (
            <tr key={item.file_id}>
              <td>{item.file_id}</td>
              <td>{item.file_name}</td>
              <td>{item.file_url}</td>
              <td>
                <button onClick={() => handleclickView(item.file_id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListView;
