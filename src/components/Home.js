import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UrlContext } from "../context/urlContext";

function Home () {
  const url = useContext(UrlContext);
  const [number, setNumber] = useState(0);
  const [dbConnected, setDBConnected] = useState(false);
  useEffect(() => {
  

    async function connectDB() {
      const controller = new AbortController();
      const signal = controller.signal;
  
  // 5 second timeout:
    const timeoutId = setTimeout(() => controller.abort(), 5000)

        try {
          const result = await fetch(`${url}`, {
          signal: controller.signal,
          method: "GET",
          mode: "cors",
          headers: {
              "Content-Type": "application/json"
              }
          }).then((response) => {
              const data = response.json();
              return data;
          }).then((data) => {
            const {first_name, last_name} = data.robert[0];
            console.log(first_name, last_name);
            if(first_name === "Robert" && last_name === "Hickerson"){
              setDBConnected(true);
              console.log("IT UP AND RUNNING");
            }
            else {
              console.log("not connected, trying again");
              let current = number;
              if(current < 5) {
                setNumber(current += 1);
                console.log(current);
              }
            }
            clearTimeout(timeoutId)
          })
        }
        catch(err){
          console.log("error loading database: trying again");
          setTimeout(() => {
            connectDB();
          }, 5000)
        }

    }

    const timer = setTimeout(() => {
      connectDB();
    },1000);

    return () => clearTimeout(timer);


 

  }, [setNumber, number, url])


  if(dbConnected){
    return (
      <div className="text-center mt-5">
          <h1>Worms Work</h1>
          <div>
              <ul>
                  <li><Link to={'/add-client'}>Add Client</Link></li>
                  <li><Link to={'/add-bucket'}>Add Bucket</Link></li>
                  <li><Link to={'/transactions'}>Transactions</Link></li>
              </ul>
          </div>
      </div>
    )
  }
  else {
    return(
      <div>
        <h1>Trying to load database.....</h1>
      </div>
    )
  }

};

export default Home;