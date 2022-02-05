//CampsiteInfo.js
import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import { Control, LocalForm } from 'react-redux-form';

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
                <CommentForm />

            </div>

        );               
    }
    return <div />  
}
function CampsiteInfo(props) {
    if (props.campsite) {
        return(
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
// Week4 Assignment 
class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return(
            <React.Fragment>
                <span>
                    <Button outline onClick = {this.toggleModal}>
                        <i className='fa fa-pencil fa-lg' /> Submit Comment
                    </Button>
                </span>
                <Modal>
                    <ModalHeader toggle ={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm>
                            <Row className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <col>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                                </col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }

}

export default CampsiteInfo;

