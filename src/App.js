import React, {useState, useEffect} from "react";
import Datatable from "./Components/DataComp";

function App() {
  const [data,setData] = useState([]);
  const[q, SetQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["name","street"]);

  //fetch the data from the texas breweries api
  useEffect(() => {
    fetch("https://api.openbrewerydb.org/breweries?by_state=texas")
      .then((response) => response.json())
      .then((json) => setData(json)); 
  }, []);
 
  //making the data user-frinedly
  for(const dict of data)
  {
      //changes null vals to empty vals so search function can be implemented
      for(const key in dict){
        if(dict[key] == null) {
          dict[key] = '';
        }
      }
      if(dict[0] == 'name')
      {
        dict[0] = 'Name';
      }

      //removes important columns if all the values in the columns are empty
      if(dict.address_2 == '') {
        delete(dict.address_2);
      }
      if(dict.address_3 == '') {
        delete(dict.address_3);
      }
      if(dict.county_province == '') {
        delete(dict.county_province);
      }
 
      //remove unnecessary columns for the user
      delete(dict.id);
      delete(dict.state);
      delete(dict.country);
      delete(dict.longitude);
      delete(dict.latitude);
      delete(dict.updated_at);
      delete(dict.created_at);
  }

  //allows user to search all values in datatable
  function search(rows) {
    return rows.filter((row)=>
      searchColumns.some((column) => 
        row[column].toString().toLowerCase().indexOf(q.toLowerCase()) >= 0)
      );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      <div>
        Search:
        <input type = "text" value = {q} onChange={(e) => SetQ(e.target.value)} />
        {
          columns && columns.map(column => <label>
            <input type="checkbox" checked = {searchColumns.includes(column)}
              onChange = {() => {
                const checked = searchColumns.includes(column)
                setSearchColumns(prev => checked
                  ? prev.filter(next => next !== column)
                  : [...prev,column])
              }}/>
            {column}
          </label>)
        }
      </div>
      <div>
        <Datatable data = {search(data)}/>
      </div> 
    </div>
  );
}

export default App;