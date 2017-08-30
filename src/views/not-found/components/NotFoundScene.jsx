import React from 'react';
import { Link } from 'react-router';

const NotFoundScene = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <section className="box nobox ">
          <div className="content-body">
            <div className="row">
              <div className="col-xs-12">
                <h1 className="page_error_code text-primary">400</h1>
                <h1 className="page_error_info">Oops! Page not found!</h1>
                <div className="row">
                  <div className="col-md-offset-3 col-sm-offset-3 col-xs-offset-2 col-xs-8 col-sm-6">
                    <div className="text-center page_error_btn">
                      <Link ckassName="btn btn-primary btn-lg" to="/"><i className="fa fa-location-arrow" /> &nbsp; Back to Home</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default NotFoundScene;
