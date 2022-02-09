import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions())
};
class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
    }
    
    render() {
        const HomePage = () => { //arrow function inherit this.parentClass not reg function 
            return (
                <Home 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            ); 
        }; //locally scope component 

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                /> 
                //+match.params.campsiteId the + operator in this case use to convert a string to number to compare id
            );
        };    

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page"  timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                            <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />}/>
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
                {/* this called the directory page
                 <Directory campsites ={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                    <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
        */}
            </div>
        );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));



// LEARNING NOTES 
/*
 onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId}); // in react, you NEVER want to update the state DIRECTLY
        // ex: this.state.selectedCampsite = campsite; never use = (assignment operator) to change the state
        //constructor is the only place that can only assign a property directly 
        // outside of constructor ALWAYS use set state
    }

*/
