import { Link } from "react-router-dom";

function Home () {
    console.log("home")
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
};

export default Home;