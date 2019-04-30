import React, { Component } from 'react';
import logo from 'C:/Users/Chirag/Desktop/F8/Code/ReactJS_Seed_Project/public/img/arcReactor.gif';
import { Link, Location } from 'react-router';

class ARC extends Component {

    render() {
        return (
            
            <div className="text-center loginscreen animated fadeInDown">
            
                <div>
                <br /><br />
                    <img src={logo}/>
                    
                    <h1 className="logo-name1">ARC</h1>

                </div>
                <h2>Augmented Reality Classroom</h2>
                <p>
                    Interactive AR based collaborative learning experience for all. Anytime. Anywhere.
                </p>
                <br /><br />
                <span>
                <Link to="/main">
                    <button className="btn btn-primary btn-lg"><i className="fa fa-book"></i> Start Learning</button>
                </Link>
                </span>
                <br /><br />
                <p className="m-t"> <small>Powered by Facebook &copy; 2019</small> </p>
        </div>

        )
    }

}

export default ARC