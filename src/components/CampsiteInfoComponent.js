import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal,
ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
/* another way to write maxLength above
function maxLength(len){
    return function (val) {
        return
            !val || val.length <= len;
    }
}
*/
const minLength = len => val => val && (val.length >= len);

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
                <CommentForm />

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
class CommentForm extends Component{
    state = {

        isModalOpen: false,
    };
  
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };
    handleSubmit = (values) => {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    };

    /*
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
    */
    render() {
        return(
            <React.Fragment>
                <span>
                    <Button outline onClick = {this.toggleModal}>
                        <i className='fa fa-pencil fa-lg' /> Submit Comment
                    </Button>
                </span>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle ={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className='form-group'>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                </Control.select>
                            </div >
                            <div className='form-group'>
                            <Label htmlFor='author'>Your Name</Label>
                            <Control.text 
                                model ='.author' 
                                name='author' 
                                id='author' 
                                className='form-control'
                                placeholder='Your Name'
                                validators = {{
                                    required, 
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors 
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: "Required",
                                    minLength: "Must be at least 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                }}
                            />
                            </div>
                            <div className='form-group'>
                                <Label htmlFor='text'>Comment</Label>
                                <Control.textarea 
                                    model='.text'
                                    name='text'
                                    id='text'
                                    className='form-control'
                                    rows='6'
                                />
                            </div>
                            <div className='form-group'>
                                <Button type='submit' color='primary'>Submit</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}


export default CampsiteInfo;
