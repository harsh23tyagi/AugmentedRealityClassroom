import React, { Component } from 'react';

class Main extends Component {

    render() {
        return (
            <div align="center" className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                Facebook AR Classroom
                            </h1>
                        </div>
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title">
                                    <h5>AR lectures</h5>
                                    <div className="ibox-tools">
                                        <a className="collapse-link">
                                            <i className="fa fa-chevron-up"></i>
                                        </a>
                                        <a className="close-link">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    <table className="table table-hover no-margins">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Topic</th>
                                                <th>Date</th>
                                                <th>Instructor</th>
                                                <th>Progress</th>
                                                <th>Access</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td><span className="label label-primary">Live</span></td>
                                                <td>Parts of the Brain</td>
                                                <td><i className="fa fa-clock-o"></i> 9:00pm</td>
                                                <td>Samantha</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 24% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Join</button>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                            <td><span className="label label-primary">Live</span></td>
                                                <td>Chemistry Lab</td>
                                                <td><i className="fa fa-clock-o"></i> 9:00am</td>
                                                <td>John</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 54% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Join</button>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td><span className="label label-primary">Live</span></td>
                                                <td>Optics Lab</td>
                                                <td><i className="fa fa-clock-o"></i> 9:00am</td>
                                                <td>Agnes</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 12% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Join</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="label label-primary">Live</span></td>
                                                <td>Mechanics Lab</td>
                                                <td><i className="fa fa-clock-o"></i> 9:00am</td>
                                                <td>Janet</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 22% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Join</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="label label-warning">Canceled</span> </td>
                                                <td>Human Body</td>
                                                <td><i className="fa fa-clock-o"></i> 10:00am</td>
                                                <td>Monica</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 0% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Schedule Later</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="label label-success">Completed</span> </td>
                                                <td>Automobile Lab</td>
                                                <td><i className="fa fa-clock-o"></i> 08:10am</td>
                                                <td>Amelia</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 100% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Download</button>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td>
                                                <span className="label label-success">Completed</span> </td>
                                                <td>Environmental Studies</td>
                                                <td><i className="fa fa-clock-o"></i> 08:08am</td>
                                                <td>Damian</td>
                                                <td className="text-navy"> <i className="fa fa-level-up"></i> 100% </td>
                                                <td>                
                                                     <button className="btn btn-primary btn-md">Download</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main