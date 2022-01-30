import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {
    return(
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>

        </div>
        );
}
function RenderComments({comments}) {
    if(comments) {
        return(
            /*
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments =><div key={comments.id}>{comments.text} <br />
                --{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</div>) }
            </div
            */
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments=> {
                    return(
                        <div key={comments.id}>
                            <p>{comments.text}<br />
                            -- {comments.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                        </div>
                    );
                })}
            </div>

        );               
    }
    return <div />  
}
function CampsiteInfo(props) {
    if (props.campsite) {
        return(
            // the lecture week3 at the end of exercise1: presentation and container component , but if put the container div here, it mess things up 
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
            </div>
                <div className = "row">
                    <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                </div>
            </div> 
    );
    } 
    return <div />;
}

export default CampsiteInfo;














// original code before Wek3: 3.Exercise Functional Components at 3:28 mins 
/*
import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class CampsiteInfo extends Component{
    constructor(props){
        super(props);
    }

    renderCampsite(campsite) {
        return(
        <div className='col-md-5 m-1'>
             <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>

        </div>
        );
    }
    renderComments(comments) {
        if(comments) {
            return(
               
                //<div className="col-md-5 m-1">
                    //<h4>Comments</h4>
                    //{comments.map(comments =><div key={comments.id}>{comments.text} <br />
                    //--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</div>) }
                //</div
                
               
                <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment=> {
                    return(
                        <div key={comment.id}>
                            <p>{comment.text}<br />
                            -- {comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                         </div>
                    );
                })}
            </div>
         );               
     }
     return <div />  
 }
 render() {
     if (this.props.campsite) {
         return(
             // the lecture week3 at the end of exercise1: presentation and container component , but if put the container div here, it mess things up 
             <div className = "row">
                 {this.renderCampsite(this.props.campsite)}
                 {this.renderComments(this.props.campsite.comments)}
             </div>
     )
     } 
     return <div />
 }
}
export default CampsiteInfo;


*/